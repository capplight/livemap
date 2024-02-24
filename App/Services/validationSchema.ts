import * as Yup from 'yup';

const phoneRegExp = /^\d{10}$/;
const fullNameRegExp = /\s{1,}/;
const otpRegExp = /^(?=.{4}$).*/;
const passwordRegExp =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const signInDataSchema = Yup.object().shape({
  email: Yup.string()
    .min(5, 'Too Short!. Minimum length is 5')
    .max(30, 'Too Long!. Maximum length is 30')
    .email('Email Address is invalid')
    .required('Email Address is required'),
  password: Yup.string().required('Please enter your password'),
});

export const signUpDataSchema = Yup.object().shape({
  email: Yup.string()
    .min(5, 'Too Short!. Minimum length is 5')
    .max(30, 'Too Long!. Maximum length is 30')
    .email('Email Address is invalid')
    .required('Email Address is required'),
  full_name: Yup.string().required('Please enter your full name'),
  user_name: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Username required to display on profile'),
  password: Yup.string().required('Please enter your password'),
});
