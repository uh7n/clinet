import * as yup from 'yup';

export const RegValidations = yup.object().shape({
    Fname:yup.string()
    .required("Name cannot be empty"),

    email:yup.string()
    .email("Incorrect Email Format")
    .required("Email cannot be empty"),

    password: yup.string()
    .required("Passwrod cannot be empty")
    .min(6,"Mininum 6 Characters"),

    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Confirm Password cannot be empty"),



    imageURL:yup.string()
    .required("Image Link cannot be empty"),
});