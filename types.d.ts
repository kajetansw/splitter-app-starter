type Status = {
  id: string;
  amount: number;
  owner: string | User;
  debtor: string | User;
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
  date: Date;
  amount: number;
  payer: string | User;
  debtor: string | User;
};

type ActionType = 
  'SHOPPING' 
  | 'BILLS'
  | 'TRIP'
  | 'RESTAURANT';