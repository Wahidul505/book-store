export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  addedBy: string;
  reviews: string[];
}

export interface IBookState {
  searchTerm: string | null;
  filterOption: string | null;
}
