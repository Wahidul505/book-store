import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBookState } from "../../../types/book";

const initialState: IBookState = {
  searchTerm: null,
  filterOption: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string | null>) => {
      state.searchTerm = action.payload;
    },
    setFilterOption: (state, action: PayloadAction<string | null>) => {
      state.filterOption = action.payload;
    },
  },
});

export const { setSearchTerm, setFilterOption } = bookSlice.actions;
export default bookSlice.reducer;
