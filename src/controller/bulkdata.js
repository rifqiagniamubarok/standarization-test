import Joi from 'joi';
import { prismaClient } from '../application/database';

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const payloadBlogGenerator = (total = 10) => {
  const data = [...Array(total)].map(() => {
    const code = generateRandomCode();
    return {
      title: `Title ${code}`,
      content: `Content ${code}`,
    };
  });

  return data;
};

const payloadTagGenerator = (total = 5) => {
  const data = [...Array(total)].map(() => {
    const code = generateRandomCode();
    return {
      name: `name ${code}`,
    };
  });

  return data;
};

const payloadSchema = Joi.object({
  blog: Joi.number().default(10).optional().allow(null),
  tag: Joi.number().default(5).optional().allow(null),
});

const createBulkDataLooping = async (req, res, next) => {
  try {
    const { value, error } = payloadSchema.validate(req.body);

    if (error) {
      throw error;
    }

    const payloadBlog = payloadBlogGenerator(value.blog);
    const payloadTag = payloadTagGenerator(value.tag);

    await Promise.all(
      payloadBlog.map(async (blog) => {
        const getBlog = await prismaClient.blog.create({
          data: blog,
        });
        await Promise.all(
          payloadTag.map(async (tag) => {
            await prismaClient.tag.create({
              data: {
                ...tag,
                blogId: getBlog.id,
              },
            });
          })
        );
      })
    ).then(() => {
      return res.status(200).json({
        status: 'success',
        data: payloadBlog,
      });
    });
  } catch (error) {
    next(error);
  }
};

const getBulkDataLooping = async (req, res, next) => {
  try {
    const { value, error } = payloadSchema.validate(req.body);

    if (error) {
      throw error;
    }

    const blogs = await prismaClient.blog.findMany({
      take: value.blog,
    });

    let getTags = [];

    await Promise.all(
      blogs.map(async (blog) => {
        const tags = await prismaClient.tag.findMany({
          where: {
            blogId: blog.id,
          },
        });

        getTags = [...getTags, ...tags];
      })
    );
  } catch (error) {
    next(error);
  }
};

const createBulkDataTrue = async (req, res, next) => {
  try {
    const { value, error } = payloadSchema.validate(req.body);

    if (error) {
      throw error;
    }

    const payloadBlog = payloadBlogGenerator(value.blog);
    const payloadTag = payloadTagGenerator(value.tag);

    const getBlog = await prismaClient.blog.createManyAndReturn({
      data: payloadBlog,
      select: {
        id: true,
      },
    });

    const getBlogId = getBlog.map((blog) => blog.id);

    let tagsForPayload = [];
    getBlogId.forEach((blogId) => {
      const tags = payloadTag.map((tag) => {
        return {
          ...tag,
          blogId,
        };
      });
      tagsForPayload = [...tagsForPayload, ...tags];
    });

    await prismaClient.tag.createMany({
      data: tagsForPayload,
    });

    return res.status(200).json({ data: tagsForPayload });
  } catch (error) {
    next(error);
  }
};

export default { createBulkDataLooping, createBulkDataTrue, getBulkDataLooping };
