import { MemoryData } from '@data/MemoryData';
import { CustomError } from '@error/CustomError';
import { Memory } from '@model/Memory';
import { IdGenerator } from '@services/IdGenerator';
import { MemoryDTO } from 'types/MemoryDTO';

export class MemoryBusiness {
  constructor(private memoryData: MemoryData, private idGenerator: IdGenerator) {}

  public async createMemory(memoryDTO: MemoryDTO): Promise<void> {
    try {
      if (!memoryDTO.content) {
        throw new CustomError(400, 'Missing input');
      }

      const newMemory: Memory = {
        id: this.idGenerator.generate(),
        userId: memoryDTO.userId,
        content: memoryDTO.content,
        excerpt: memoryDTO.content.substring(0, 115).concat('...'),
        coverUrl: memoryDTO.coverUrl,
        isPublic: memoryDTO.isPublic,
        createdAt: new Date(),
      };

      await this.memoryData.createMemory(newMemory);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getMemories(): Promise<Memory[]> {
    try {
      const memories = await this.memoryData.getMemories();
      return memories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getMemoryById(id: string): Promise<Memory> {
    try {
      const memory = await this.memoryData.getMemoryById(id);
      return memory;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateMemory(id: string, memoryDTO: MemoryDTO): Promise<void> {
    try {
      if (!memoryDTO.content) {
        throw new CustomError(400, 'Missing input');
      }

      const memory: Memory = {
        id,
        userId: memoryDTO.userId,
        content: memoryDTO.content,
        excerpt: memoryDTO.content.substring(0, 115).concat('...'),
        coverUrl: memoryDTO.coverUrl,
        isPublic: memoryDTO.isPublic,
        createdAt: new Date(),
      };

      await this.memoryData.updateMemory(id, memory);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteMemory(id: string): Promise<void> {
    try {
      await this.memoryData.deleteMemory(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
