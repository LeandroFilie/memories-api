import { MemoryData } from '@data/MemoryData';
import { CustomError } from '@error/CustomError';
import { Memory } from '@model/Memory';
import { IdGenerator } from '@services/IdGenerator';
import validateToken from 'src/utils/TokenValidator';
import { MemoryDTO } from 'types/MemoryDTO';

export class MemoryBusiness {
  constructor(private memoryData: MemoryData, private idGenerator: IdGenerator) {}

  public async createMemory(memoryDTO: MemoryDTO, token: string): Promise<void> {
    try {
      const authdata = validateToken(token);

      if (!memoryDTO.content) {
        throw new CustomError(400, 'Missing input');
      }

      const newMemory: Memory = {
        id: this.idGenerator.generate(),
        userId: authdata.id,
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

  public async getMemories(token: string): Promise<Memory[]> {
    try {
      const authdata = validateToken(token);
      const memories = await this.memoryData.getMemories(authdata.id);
      return memories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getMemoryById(id: string, token: string): Promise<Memory> {
    try {
      const authData = validateToken(token);
      const memory = await this.memoryData.getMemoryById(id, authData.id);
      if(memory.userId !== authData.id) {
        throw new CustomError(401, 'Unauthorized');
      }
      return memory;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateMemory(id: string, memoryDTO: MemoryDTO, token: string): Promise<void> {
    try {
      const authdata = validateToken(token);
      if (!memoryDTO.content) {
        throw new CustomError(400, 'Missing input');
      }

      const memory: Memory = {
        id,
        userId: authdata.id,
        content: memoryDTO.content,
        excerpt: memoryDTO.content.substring(0, 115).concat('...'),
        coverUrl: memoryDTO.coverUrl,
        isPublic: memoryDTO.isPublic,
        createdAt: new Date(),
      };

      await this.memoryData.updateMemory(id, memory, authdata.id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteMemory(id: string, token: string): Promise<void> {
    try {
      const authData = validateToken(token);
      await this.memoryData.deleteMemory(id, authData.id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
