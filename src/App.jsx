import "./App.css";
import MovieCard from "./components/MovieCard";
import { Route, Routes, useLocation } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import MovieLoad from "./api";
import Search from "./components/Search";
import { radomPages } from "./functions/RandomPage";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const [isImageLoading, setisImageLoading] = useState(true);

  const handleLoad = async (page) => {
    // Page 전달 후 추가로 영화 불러오기
    const data = await MovieLoad(page); //  API 데이터 fetch 함수 실행
    if (page <= 500) {
      setMovieData([...movieData, ...data.results]); // 기존 데이터 + 불러온 데이터
    }
    setPage((prev) => prev + 1); // 페이지 + 1
  };

  // 렌더링 후 1번만 영화 데이터 불러오기
  useEffect(() => {
    handleLoad(page);
  }, []);

  const [swiperPages, setSwiperPages] = useState(null);
  useEffect(() => {
    setSwiperPages(radomPages(1));
  }, []);

  console.log(movieData);

  return (
    <>
      <Routes>
        <Route element={<Layout handleLoad={handleLoad} page={page} />}>
          <Route
            path="/"
            element={
              <MovieCard
                movieData={movieData}
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
                movieData={movieData}
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
