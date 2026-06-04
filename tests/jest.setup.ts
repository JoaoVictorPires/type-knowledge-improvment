import superstest from 'supertest';

import { app } from '../src/server/server';


export const testServer = superstest(app);
