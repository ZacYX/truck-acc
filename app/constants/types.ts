import { ProductCategory } from "./data";

type LinkType = {
  title: string,
  link: string,
}

type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  details: string;
  image: string;
  quantity: number;
  price: number;

}

type Photo = {
  id: number,
  title: string,
  path: string,
  width: number,
  height: number,
}

export type { LinkType, Product, Photo }