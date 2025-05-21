import { Request as ExpressRequest } from 'express';

declare module 'json-server' {
  export interface Request extends ExpressRequest {
    params: { [key: string]: string };  // Ensure `params` is available with string keys
  }
}
