import { prismaClient } from '../src/application/database';

export const deleteDataBlogAndTag = async () => {
  await prismaClient.tag.deleteMany();
  await prismaClient.blog.deleteMany();
};
