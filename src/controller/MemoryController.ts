import { Request, Response } from 'express';
import { MemoryBusiness } from 'src/business /MemoryBusiness';
import { MemoryDTO } from 'src/types/MemoryDTO';

export class MemoryController {
  constructor(private memoryBusiness: MemoryBusiness) {}

  createMemory = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.body.userId as string;
      const content = req.body.content as string;
      const coverUrl = req.body.coverUrl as string;
      const isPublic = req.body.isPublic as number;

      const memoryDTO: MemoryDTO = {
        userId,
        content,
        coverUrl,
        isPublic: !!isPublic,
      };

      await this.memoryBusiness.createMemory(memoryDTO);
      res.status(200).send({ message: 'Memory created successfully.' });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };

  getMemories = async (req: Request, res: Response) => {
    try {
      const result = await this.memoryBusiness.getMemories();
      res.status(200).send(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };

  getMemoryById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
      const result = await this.memoryBusiness.getMemoryById(id);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };

  updateMemory = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.body.userId as string;
    const content = req.body.content as string;
    const coverUrl = req.body.coverUrl as string;
    const isPublic = req.body.isPublic as number;

    try {
      const memoryDTO: MemoryDTO = {
        userId,
        content,
        coverUrl,
        isPublic: !!isPublic,
      };

      await this.memoryBusiness.updateMemory(id, memoryDTO);
      res.status(200).send({ message: 'Memory updated successfully.' });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };

  deleteMemory = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    try {
      await this.memoryBusiness.deleteMemory(id);
      res.status(200).send({ message: 'Memory deleted successfully.' });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };
}
