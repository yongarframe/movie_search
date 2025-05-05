export function radomPages(numberOfPages) {
  const radomMoviePages = [];
  radomMoviePages.splice(0, numberOfPages);
  while (radomMoviePages.length < numberOfPages) {
    let ran = Math.floor(Math.random() * 500) + 1;
    if (radomMoviePages.indexOf(ran) === -1) {
      radomMoviePages.push(ran);
    }
  }
  return radomMoviePages;
}
