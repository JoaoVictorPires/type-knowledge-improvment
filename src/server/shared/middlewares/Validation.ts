import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = 'body' | 'query' | 'params' | 'headers';

type TGetSchema = <T>(Schema: Schema<T>) => Schema<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAllSchemas = Record<TProperty, Schema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;


export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);
  // console.log(schemas);

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, Schema]) => {
    try {
      Schema.validateSync(req[key as TProperty], { abortEarly: false });
    } catch (err) {
      const yError = err as ValidationError;
      const errors: Record<string, string> = {};

      yError.inner.forEach((error) => {
        if (!error.path) return;

        errors[error.path] = error.message;
      });
      errorsResult[key] = errors;
    }
  });


  if(Object.entries(errorsResult).length === 0) {
    return next();
  } else{
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errorsResult
    });

  }
};

