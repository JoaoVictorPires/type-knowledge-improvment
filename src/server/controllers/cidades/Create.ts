import { Request, Response } from "express";
import * as y from 'yup';


interface Icidade {
  nome: string;
  cep: number;
  estado: string;
}


const bodyValidation: y.ObjectSchema<Icidade> = y.object().shape({
  nome: y.string().required().min(3),
  cep: y.number().required().positive().integer(),
  estado: y.string().required().min(2).max(2),
});


export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {
  let validatedData: Icidade | undefined = undefined;
  try {
    validatedData = await bodyValidation.validate(req.body);
  } catch (err) {
    const yError = err as y.ValidationError;

    return res.json({
      errors: {
        default: yError.message,
      }
    });
  }


  console.log(validatedData);







  return res.send('Create');
};