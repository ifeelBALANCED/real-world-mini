import * as yup from "yup";

export const createDogSchema = yup.object().shape({
  name: yup.string().min(3).max(60).required().label("Name"),
  breed: yup.string().min(3).max(32).required().label("Breed"),
  age: yup
    .number()
    .min(0)
    .max(100)
    .moreThan(0, "Age should not be zero or less than zero")
    .lessThan(100, "Age should not be more than 2 digits")
    .required()
    .label("Age"),
});
