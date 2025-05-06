import { createSelector } from "@reduxjs/toolkit";

export const moreMovieByPage = createSelector(
  (state) => state.movie.data.results,
  (results) => results
);
