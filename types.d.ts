import * as express from 'express';
import { Server } from 'http';
import { API } from './api';

/*
#################################
  DB MODELS
#################################
*/

type Status = {
  id: string;
  amount: number;
  owner: string;
  debtor: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Action = {
  id: string;
  description: string;
  type: ActionType;
  date: string;
  amount: number;
  payer: string;
  debtor: string;
};

type ActionType =
  'SHOPPING'
  | 'BILLS'
  | 'TRIP'
  | 'RESTAURANT';


/*
#################################
  SIMPLE-JSON-DB MODELS
#################################
*/

type PathCollection = {
  users: User[];
  actions: Action[];
  statuses: Status[];
};

type SimpleDb = {
  get:
    <Path extends keyof PathCollection>
      (path: Path)
        => PathCollection[Path];
  set:
    <Path extends keyof PathCollection>
      (path: Path, value: PathCollection[Path])
        => void;
};

/*
#################################
  EXPRESS.JS MODELS
#################################
*/

export type Application = {
  use: (...handlers: express.RequestHandler[]) => Application;
  post:
    <Path extends keyof API>(
      path: Path,
      callback: <Method extends keyof API[Path]>(
        request: TypedRequest<Method extends 'POST' ? API[Path][Method] : API[Path][never]>,
        response: express.Response
      ) => void
    ) => void;
  get:
    <Path extends keyof API>(
      path: Path,
      callback: <Method extends keyof API[Path]>(
        request: TypedRequest<Method extends 'GET' ? API[Path][Method] : API[Path][never]>,
        response: express.Response
      ) => void
    ) => void;
  delete:
    <Path extends keyof API>(
      path: Path,
      callback: <Method extends keyof API[Path]>(
        request: TypedRequest<Method extends 'DELETE' ? API[Path][Method] : API[Path][never]>,
        response: express.Response
      ) => void
    ) => void;
  listen: (port: number, callback?: () => void) => Server;
};

export interface RestypedRoute {
  params?: any;
  query?: any;
  body?: any;
  response?: any;
}

export interface TypedRequest<T extends RestypedRoute> extends express.Request {
  body: T['body'];
  params: T['params'];
  query: T['query'];
}
