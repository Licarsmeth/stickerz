const baseUrl = "/api/";
export const ApiRoutes = {
  Login: baseUrl + "login",
  Signup: baseUrl + "signup",
  AddSticker: baseUrl + "sticker/add",
  GetSticker: baseUrl + "sticker/get",
  Stickers: baseUrl + "sticker/all",
  SearchStickers: baseUrl + "sticker/search",
  AddToCart: baseUrl + "cart/add",
  GetCartItems: baseUrl + "cart/get",
  CheckoutCartItems: baseUrl + "cart/checkout",
  GetProfileDetails: baseUrl + "profile/get",
  GetProfileHistory: baseUrl + "profile/history",
  GetAllUsers: baseUrl + "profile/all",
};
