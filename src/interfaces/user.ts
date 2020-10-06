import { List } from "./list";

export interface User {
  id: number;
  email: string;
  lists: List[];
}
