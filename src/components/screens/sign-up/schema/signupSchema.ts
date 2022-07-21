import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(60)
    .required()
    .label("Username")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: yup.string().email().min(6).max(32).required().label("Email"),
  password: yup.string().min(6).max(32).required().label("Password"),
});
