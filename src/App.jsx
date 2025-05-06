import "./App.css";
import MovieCard from "./components/MovieCard";
import { Route, Routes, useLocation } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import { radomPages } from "./functions/RandomPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "./RTK/thunk";

const API = import.meta.env.VITE_API_TOKEN;

// 첫 검색시 바로 search 페이지로 넘어가는 문제 수정 필요 (디바운스와 동일하게 1초뒤 변경할것)
// swiper 의 random 페이지도 redux 로 관리하기

function App() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.movie.page);
  const location = useLocation();
  const [isImageLoading, setisImageLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchMovieData({ API, page }));
  }, []);

  const handleLoad = async (page) => {
    dispatch(fetchMovieData({ API, page: page + 1 }));
  };

  const [swiperPages, setSwiperPages] = useState(null);
  useEffect(() => {
    setSwiperPages(radomPages(1));
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout handleLoad={handleLoad} page={page} />}>
          <Route
            path="/"
            element={
              <MovieCard
                swiperPages={swiperPages}
                isImageLoading={isImageLoading}
                setisImageLoading={setisImageLoading}
              />
            }
          />
          <Route path={"/detail/:id"} element={<MovieDetail />} />
          <Route
            path={"/search"}
            element={
              <Search
                swiperPages={swiperPages}
                isImageLoading={isImageLoading}
                setisImageLoading={setisImageLoading}
              />
            }
          />
        </Route>
      </Routes>
      {location.pathname === "/" && (
        <>
          <button className="more-button" onClick={() => handleLoad(page)}>
            더보기
          </button>
          <button
            className="top-button"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            {" "}
            TOP
          </button>
        </>
      )}
    </>
  );
}

export default App;
