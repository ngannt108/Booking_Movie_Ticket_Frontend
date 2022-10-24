const API_DOMAIN = "http://localhost:5000/";

export const API_MOVIE = {
  COMING: API_DOMAIN + "movies/coming",
  SHOWING: API_DOMAIN + "movies",
  DETAIL: API_DOMAIN + `movies/`,
  UPDATE: API_DOMAIN + `admins/movie/`,
  ADD: API_DOMAIN + `admins/movie`,
};

export const API_SHOWTIMES = {
  ADD: API_DOMAIN + `admins/movie/`,
};
export const API_ROOMS = {
  GET: API_DOMAIN + 'admins/movie/room'
}

export const API_THEATERS = {
  SHOWING: API_DOMAIN + "movies/showing",
  THEATERS: API_DOMAIN + "movies/movietheater",
};

export const API_ACCOUNTS = {
  SIGNIN: API_DOMAIN + "accounts/signin",
  SIGNUP: API_DOMAIN + "accounts/signUp",
};
