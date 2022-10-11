const API_DOMAIN = "http://localhost:5000/";

export const API_MOVIE = {
  COMING: API_DOMAIN + "movies/coming",
  SHOWING: API_DOMAIN + "movies/showing",
  DETAIL: API_DOMAIN + `movies/`,
  UPDATE: API_DOMAIN + `admins/movie/`,
  ADD: API_DOMAIN + `admins/movie`,
};

export const API_THEATERS = {
  THEATERS: API_DOMAIN + "admins/movie/movietheater",
};
