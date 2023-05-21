import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';

import { memoryRouter } from '@routes/memoryRouter';
import { authRouter } from '@routes/authRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/memory', memoryRouter);
app.use('/auth', authRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error('Failure initializing server.');
  }
});
