import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

let secret: string;
let token: string

if (process.env.TOKEN_SECRET) {
  secret = process.env.TOKEN_SECRET
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.header('Authorization')?.split(' ')[1]
    if (authToken) token = authToken
    jwt.verify(token, secret)
    next()
  } catch (error) {
    res.status(201).json({ Message: 'You are not authorized for this service' })
    
  }
}

export default verifyAuthToken