import express from 'express';

import { MemoryData } from '@data/MemoryData';
import { MemoryController } from '@controller/MemoryController';
import { MemoryBusiness } from 'src/business /MemoryBusiness';
import { IdGenerator } from 'src/services/IdGenerator';

export const memoryRouter = express.Router();
const memoryBusiness = new MemoryBusiness(new MemoryData(), new IdGenerator());
const memoryController = new MemoryController(memoryBusiness);

memoryRouter.post('/create', memoryController.createMemory);
memoryRouter.get('/all', memoryController.getMemories);
memoryRouter.get('/:id', memoryController.getMemoryById);
memoryRouter.put('/:id', memoryController.updateMemory);
memoryRouter.delete('/:id', memoryController.deleteMemory);
