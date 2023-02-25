export interface UserCreationRequest extends Request {
  username: string;
  password: string;
  email: string;
  image: string;
}
