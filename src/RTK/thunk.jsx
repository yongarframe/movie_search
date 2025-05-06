import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovieData = createAsyncThunk(
  "movie/fetchMovieData",
  async ({ API, page }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API}`,
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&page=${page}&region=ko`,
      options
    );
    const data = await res.json();
    return data;
  }
);
