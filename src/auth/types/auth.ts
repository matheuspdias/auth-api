import { Request as ExpressRequest } from 'express';

export interface JwtPayload {
  userId: number;
  name: string;
  email: string;
}

export type AuthRequest = ExpressRequest & {
  user: JwtPayload;
};
