import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as y from 'yup';

import { validation } from "../../shared/middlewares";


interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}


export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(y.object().shape({
    page: y.number().optional().moreThan(0),
    limit: y.number().optional().moreThan(0),
    filter: y.string().optional(),
  })),
}));
export const getAll = async (req: Request<{},{} , {}, IQueryProps>, res: Response) => {
  console.log(req.query);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};