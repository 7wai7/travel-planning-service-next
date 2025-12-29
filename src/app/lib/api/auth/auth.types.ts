export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
} & LoginRequest;

export type User = {
  id: string;
  username: string;
  email: string;
};

export type TokenUserData = {
  id: number;
  username: string;
  email: string;
};
