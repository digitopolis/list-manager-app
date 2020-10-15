import { List } from "./list";

export interface Item {
  id: number;
  title: string;
  creator: string;
  medium: string;
  image_url: string;
  lists: List[];
  tags: string[];
}
