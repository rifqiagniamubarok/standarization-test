import { prismaClient } from '../src/application/database';

export const removeUser = async (email) => {
  await prismaClient.user.deleteMany({
    where: {
      email,
    },
  });
};
