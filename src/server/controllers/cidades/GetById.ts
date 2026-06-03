import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as y from 'yup';

import { validation } from "../../shared/middlewares";


interface IParamsProps {
  id?: number;
}


export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(y.object().shape({
    id: y.number().required().moreThan(0),
  })),
}));
export const getById = async (req: Request<{},{} , {}, IParamsProps>, res: Response) => {
  console.log(req.params);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};