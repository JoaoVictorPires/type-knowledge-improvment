import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as y from 'yup';


interface Icidade {
  nome: string;
  estado: string;
}



const bodyValidation: y.ObjectSchema<Icidade> = y.object().shape({
  nome: y.string().required().min(3),
  estado: y.string().required().min(2).max(2),
});


export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {
  let validatedData: Icidade | undefined = undefined;
  try {
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
  } catch (err) {
    const yError = err as y.ValidationError;
    const errors: Record<string, string> = {};

    yError.inner.forEach((error) => {
      if (!error.path) return;

      errors[error.path] = error.message;
    })

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: errors,
      }
    });
  }


  console.log(validatedData);







  return res.status(StatusCodes.CREATED).send('Create');
};