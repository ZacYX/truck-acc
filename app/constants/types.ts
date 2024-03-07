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
  pictures: Picture[];
  quantity: number;
  price: number;

}

type Picture = {
  id: number,
  name: string,
  width: number,
  height: number,
  url: string,
}

export type { LinkType, Product, Picture }