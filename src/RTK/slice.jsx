import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieData } from "./thunk";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    results: [],
    page: 1,
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.loading = false;
        const newResults = action.payload.results;
        state.results.push(...newResults);
        state.page = action.payload.page;
      });
  },
});
