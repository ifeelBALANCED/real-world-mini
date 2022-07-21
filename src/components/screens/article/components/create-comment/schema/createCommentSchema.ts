import * as yup from "yup";

export const createCommentSchema = yup.object().shape({
  body: yup.string().min(3).required().label("Body"),
});
