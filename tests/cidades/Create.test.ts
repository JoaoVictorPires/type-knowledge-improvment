import { describe, expect, it } from '@jest/globals';
import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Cidades - Create', () => {

  it('Cria registro', async () => {
    const res1 = await testServer.post('/cidades').send({ nome: 'Pouso Alegre' });
    expect(res1.statusCode).toBe(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('Tenta criar registro com nome inválido', async () => {
    const res1 = await testServer.post('/cidades').send({ nome: 'Po' });
    expect(res1.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
});


