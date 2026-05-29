import { Request, Response } from "express";



interface Icidade {
  nome: string;
}



export const create = (req: Request<{}, {}, Icidade>, res: Response) =>{

  const data: Icidade = req.body;
  console.log(data);

  return res.send(data);
};