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

export const findYourAccountSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .matches(/@[^.]*\./, "Please enter a valid email address")
        .required("Email address is required."),
})

export const codeSchema = yup.object().shape({
    code: yup.string()
        .length(5, "Code must be exactly 5 digits")
        .matches(/^\d+$/, "Code must contain only digits")
        .required("Verification code is required"),
});

export const changePasswordSchema = yup.object().shape({
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: yup.string()
        .required("confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match")
})