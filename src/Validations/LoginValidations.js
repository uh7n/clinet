import * as yup from 'yup';

export const LoginValidations = yup.object().shape({
   email:yup.string()
   .email("Incorrect Email Format")
   .required("Email cannot be empty"),
   password: yup.string()
   .required("Passwrod cannot be empty")
   .min(6,"Mininum 6 Characters")
});