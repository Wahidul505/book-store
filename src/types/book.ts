export interface IBook {
  _id: number | string;
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  addedBy: string;
  reviews: string[];
}

export interface IBookState {
  searchTerm: string | null;
  filterOption: string | null;
}
