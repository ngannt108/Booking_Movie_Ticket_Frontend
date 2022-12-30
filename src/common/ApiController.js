// export const API_DOMAIN = "http://localhost:5000/";
export const API_DOMAIN = "https:/api.baophuong.tk/";

export const API_MOVIE = {
  COMING: API_DOMAIN + "movies/coming",
  SHOWING: API_DOMAIN + "movies",
  DETAIL: API_DOMAIN + `movies/`,
};

export const API_ROOMS = {
  GET: API_DOMAIN + "admins/movie/room",
};

export const API_THEATERS = {
  SHOWING: API_DOMAIN + "movies/showing",
  THEATERS: API_DOMAIN + "movies/movietheater",
};

export const API_SHOWTIME = {
  CLUSTER: API_DOMAIN + "movies/cluster/",
};

export const API_USER = {
  PROFILE: API_DOMAIN + "users",
  POSTCOMMENT: API_DOMAIN + "users/",
  CHANGE_PASSWORD: API_DOMAIN + "users/editPassword",
  HISTORY_TICKET: API_DOMAIN + "users/history",
};

export const API_ACCOUNTS = {
  SIGNIN: API_DOMAIN + "accounts/signin",
  SIGNUP: API_DOMAIN + "accounts/signUp",
};
export const API_FOODDRINKS = {
  GETALL: API_DOMAIN + "users/food_drink/",
  DETAIL: API_DOMAIN + "users/food_drink/",
};

export const API_BOOKING = {
  BOOK_TICKET: API_DOMAIN + "users/",
  SEND_EMAIL: API_DOMAIN + "users/sendEmailBooking",
  REMIND_EMAIL: API_DOMAIN + "users/reminderEmail",
  CHANGE_TICKET_MAIL: API_DOMAIN + "users/sendchangeTicketMail",
  CHANGE_TICKET: API_DOMAIN + "users/changeTicketBooking/",
  IS_CHOOSING_CHAIRS: API_DOMAIN + "users/preorder",
};
