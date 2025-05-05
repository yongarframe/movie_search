const API = import.meta.env.VITE_API_TOKEN;

export default async function MovieLoad(page) {
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

  // .then((res) => res.json())
  // .then((res) => {
  // 	setMovieData(res.results);
  // })
  // .catch((err) => console.error(err));
}
