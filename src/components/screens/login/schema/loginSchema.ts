import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().min(6).max(32).required().label("Email"),
  password: yup.string().min(6).max(32).required().label("Password"),
});
