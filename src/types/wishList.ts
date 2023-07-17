import { IBook } from "./book";

export interface IWishList {
  user: string;
  wishList: IBook[];
}
