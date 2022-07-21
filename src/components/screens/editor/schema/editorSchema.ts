import * as yup from "yup";

export const editorSchema = yup.object().shape({
  title: yup.string().min(3).max(60).required().label("Title"),
  description: yup.string().min(3).required().label("Description"),
  body: yup.string().min(3).required().label("Body"),
  tagList: yup.mixed().required().label("Tags"),
});
