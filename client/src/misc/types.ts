export type Note = {
  _id?: string;
  title: string;
  desc: string;
  tag: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
  cpassword?: string;
};

export type LoginUser = Omit<User, 'name'>;

export type TodoErrorResponse = {
  error: string;
};
