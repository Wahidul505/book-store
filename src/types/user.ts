export interface IUserState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

export interface IUserCredential {
  email: string;
  password: string;
}
