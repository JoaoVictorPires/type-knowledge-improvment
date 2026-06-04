import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as y from 'yup';

import { validation } from "../../shared/middlewares";


interface Icidade {
  nome: string;
}


export const createValidation = validation((getSchema) => ({
  body: getSchema<Icidade>(y.object().shape({
    nome: y.string().required().min(3),
  })),
}));
export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(1);
};