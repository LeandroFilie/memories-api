import express from 'express';
import cors from 'cors';

import { memoryRouter } from '@routes/memoryRouter';
import { AddressInfo } from 'net';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/memory', memoryRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error('Failure initializing server.');
  }
});
