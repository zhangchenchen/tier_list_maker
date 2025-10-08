import { User } from "./user";

export interface Feedback {
  id?: number;
  created_at: string;
  status: string;
  user_uuid: string;
  content: string;
  rating: number;
  user?: User;
}
