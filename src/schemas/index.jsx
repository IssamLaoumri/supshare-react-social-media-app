import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .matches(/@[^.]*\./, "Please enter a valid email address")
        .required("Email address is required."),
    password: yup.string()
        .required('Password is required'),
    // password: yup.string()
    //     .min(8, 'Password must be at least 8 characters')
    //     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    //     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    //     .matches(/\d/, 'Password must contain at least one number')
    //     .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    //     .required('Password is required'),
})