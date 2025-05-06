import { getRegExp } from "korean-regexp";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SwiperMovieCard from "./SwiperMovieCard";
import { useSelector } from "react-redux";

export default function Search({
  swiperPages,
  isImageLoading,
  setisImageLoading,
}) {
  const movieData = useSelector((state) => state.movie).results;
  const [filteredData, setFilteredData] = useState([]);

  const [searchParms] = useSearchParams();
  const params = searchParms.get("movie");
  const reg = getRegExp(params);

  useEffect(() => {
    // debounce
    const debounceTimeer = setTimeout(() => {
      const newfilteredData = movieData.filter((el) => el.title.match(reg));
      setFilteredData(newfilteredData);
    }, 1500);
    return () => clearTimeout(debounceTimeer);
  }, [params]);

  return (
    <>
      {swiperPages?.map((swiperPage) => (
        <SwiperMovieCard key={swiperPage} swiperPage={swiperPage} />
      ))}
      <ul className="flex justify-center flex-wrap gap-10 p-6 bg-gray-50">
        {filteredData
          .filter((movie) => !movie.adult)
          .map((filterMovie) => (
            <li
              key={filterMovie.id}
              className="w-[300px]  bg-white rounded-2xl shadow-lg "
            >
              <Link to={`detail/${filterMovie.id}`} className="flex flex-col">
                {isImageLoading ? <Spiner></Spiner> : null}
                <img
                  onLoad={() => setisImageLoading(false)}
                  className="rounded-2xl w-full aspect-[2/3] object-cover"
                  src={`https://image.tmdb.org/t/p/w500${filterMovie.poster_path}`}
                  alt={filterMovie.title}
                  style={{ display: isImageLoading ? "none" : " block" }}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {filterMovie.title}
                  </h3>
                  <p className="text-s text-gray-600">
                    ⭐ 평점: {filterMovie.vote_average.toFixed(1)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
