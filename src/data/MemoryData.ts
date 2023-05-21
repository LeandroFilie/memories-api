import { prisma } from '@lib/prisma';
import { Memory } from 'src/model/Memory';

export class MemoryData {
  createMemory = async (memory: Memory): Promise<void> => {
    try {
      await prisma.memory.create({
        data: {
          content: memory.content,
          excerpt: memory.excerpt,
          coverUrl: memory.coverUrl,
          isPublic: memory.isPublic,
          userId: memory.userId,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getMemories = async (userId: string): Promise<Memory[]> => {
    try {
      const memories = await prisma.memory.findMany({
        where: {
          userId
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return memories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getMemoryById = async (id: string, userId: string): Promise<Memory> => {
    try {
      const memory = await prisma.memory.findUnique({
        where: { id },
      });

      return memory as Memory;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  updateMemory = async (id: string, memory: Memory, userId: string): Promise<void> => {
    try {
      await prisma.memory.updateMany({
        where: {
          AND: [
            {id}, {userId},
          ]
         },
        data: {
          content: memory.content,
          excerpt: memory.excerpt,
          coverUrl: memory.coverUrl,
          isPublic: memory.isPublic,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  deleteMemory = async (id: string, userId: string): Promise<void> => {
    try {
      await prisma.memory.deleteMany({
        where: {
          AND : [
            {id}, {userId},
          ]
         },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
