import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as y from 'yup';

import { validation } from "../../shared/middlewares";


interface Icidade {
  nome: string;
  estado: string;
}

interface Ifilter {
  filter?: string;
}


export const createValidation = validation((getSchema) => ({
  body: getSchema<Icidade>(y.object().shape({
    nome: y.string().required().min(3),
    estado: y.string().required().min(2).max(2),
  })),
  query: getSchema<Ifilter>(y.object().shape({
    filter: y.string().required().min(3),
  })),
}));
export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {

  console.log(req.body);
  return res.status(StatusCodes.CREATED).send('Create');
};