import { Item } from "./item";

export interface List {
  id: number;
  title: string;
  description: string;
  items: Array<Item>;
}
