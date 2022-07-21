import { combineReducers } from "redux";

import articles from "./slices/articles.slice";
import auth from "./slices/auth.slice";
import dog from "./slices/dog.slice";
import dogs from "./slices/dogs.slice";
import home from "./slices/home.slice";
import profile from "./slices/profile.slice";

export default combineReducers({
  auth,
  home,
  dogs,
  dog,
  profile,
  articles,
});
