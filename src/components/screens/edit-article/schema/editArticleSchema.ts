import * as yup from "yup";

export const editArticleSchema = yup.object().shape({
  title: yup.string().min(3).max(60).required().label("Title"),
  description: yup.string().min(3).max(32).required().label("Description"),
  body: yup.string().min(3).max(32).required().label("Body"),
  tagList: yup.string().min(3).max(32).required().label("Tags"),
});
