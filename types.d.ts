declare module 'simple-json-db';

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