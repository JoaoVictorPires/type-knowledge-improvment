import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as y from 'yup';

import { validation } from "../../shared/middlewares";


interface IParamsProps {
  id?: number;
}

interface IBodyProps {
  nome: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(y.object().shape({
    nome: y.string().required().min(3),
  })),
  params: getSchema<IParamsProps>(y.object().shape({
    id: y.number().integer().required().moreThan(0),
  })),
}));
export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  console.log(req.params);
  console.log(req.body);


  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};