import * as yup from 'yup';

export const EventValidations = yup.object().shape({
  name: yup.string().required("Name cannot be empty"),
  description: yup.string().required("Description cannot be empty"),
  date: yup.string().required("Date cannot be empty"),
  location: yup.string().required("Input cannot be empty"),
  type: yup.string().required("Input cannot be empty"),
  price: yup.string().required("Input cannot be empty"),
  tickets: yup.string().required("Input cannot be empty"),
  image: yup.string().required("Image must be uploaded"),
  schedule: yup.string().required("Input cannot be empty"),
  organizer: yup.string().required("Input cannot be empty"),
  contact: yup.string()
    .required("Contact cannot be empty")
    .min(8, "Minimum 8 numbers"),
  status: yup.string().required("Input cannot be empty"),
  notes: yup.string().required("Input cannot be empty"),
});
