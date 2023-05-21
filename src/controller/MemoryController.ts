import { Request, Response } from 'express';
import { MemoryBusiness } from 'src/business /MemoryBusiness';
import { MemoryDTO } from 'src/types/MemoryDTO';

export class MemoryController {
  constructor(private memoryBusiness: MemoryBusiness) {}

  createMemory = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.headers.authorization as string;
      const content = req.body.content as string;
      const coverUrl = req.body.coverUrl as string;
      const isPublic = req.body.isPublic as number;

      const memoryDTO: MemoryDTO = {
        content,
        coverUrl,
        isPublic: !!isPublic,
      };

      await this.memoryBusiness.createMemory(memoryDTO, token);
      res.status(200).send({ message: 'Memory created successfully.' });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };

  getMemories = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const result = await this.memoryBusiness.getMemories(token);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };

  getMemoryById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const token = req.headers.authorization as string;
      const result = await this.memoryBusiness.getMemoryById(id, token);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };

  updateMemory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const content = req.body.content as string;
      const coverUrl = req.body.coverUrl as string;
      const isPublic = req.body.isPublic as number;
      const token = req.headers.authorization as string;

      const memoryDTO: MemoryDTO = {
        content,
        coverUrl,
        isPublic: !!isPublic,
      };

      await this.memoryBusiness.updateMemory(id, memoryDTO, token);
      res.status(200).send({ message: 'Memory updated successfully.' });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };

  deleteMemory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const token = req.headers.authorization as string;
      await this.memoryBusiness.deleteMemory(id, token);
      res.status(200).send({ message: 'Memory deleted successfully.' });
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };
}
