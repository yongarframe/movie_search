import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "./Skeleton";

export default function MovieDetail() {
  const params = useParams();
  // console.log(params.id);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API = import.meta.env.VITE_API_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API}`,
    },
  };
  const fetchData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?language=ko`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  {
    if (isLoading) return <Skeleton />;
  }
  return (
    <div className="relative w-full h-[600px] text-white">
      <img
        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        alt={data.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      <div className="absolute bottom-10 left-6 md:left-12 max-w-2xl space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold">{data.title}</h1>

        <div className="text-lg md:text-xl text-gray-300">
          평점: {data.vote_average}
        </div>

        <div className="text-sm md:text-base text-gray-300">
          장르: {data.genres?.map((el) => el.name).join(", ")}
        </div>

        <p className="text-base md:text-lg text-gray-200 leading-relaxed line-clamp-4">
          {data.overview}
        </p>

        <div className="flex gap-4 mt-4"></div>
      </div>
    </div>
  );
}
