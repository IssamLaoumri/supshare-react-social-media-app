import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {loginSchema} from "../schemas";
import "../assets/styles/pages/login.scss";
import Input from "../components/common/Input/Input.jsx";
import {motion} from "framer-motion";
import Divider from "../components/common/Divider/Devider.jsx";
import {useDispatch} from "react-redux";
import {login} from "../slices/auth.js";
import Button from "../components/common/Button/Button.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useToast} from "@/contexts/ToastContext.jsx";
import Footer from "@/components/common/Footer/Footer.jsx";

const containerVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.25,
            delayChildren: 0.3
        },
    },
};

const childVariants = {
    initial: { opacity: 0, y: 20 },
    exit: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const onSubmit = (values) => {
        setIsLoading(true);

        setTimeout(() => {
            dispatch(login(values)).unwrap()
                .then((user) => {
                    addToast("info", `Welcome ${user.lastname}, you have been signed in.`);
                    navigate("/");
                })
                .catch(error => {
                    if (error === "Unauthorized") {
                        addToast("error", "Invalid email or password. Please try again.");
                    } else {
                        addToast("error", "An unexpected error occurred. Please try again later.");
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 2000);
    };


    return (
        <motion.div
            className="login"
            initial="initial"
            animate="animate"
            variants={containerVariants}
        >
            <div className="login_wrapper">
                <div className="login_wrap">
                    <motion.div className="login_1" variants={childVariants}>
                        <img src="/supshare.png" alt="logo"/>
                    </motion.div>

                    <motion.div className="login_2" variants={childVariants}>
                        <div className="login_2_wrap">
                            <Formik
                                initialValues={{email: "", password: ""}}
                                validationSchema={loginSchema}
                                onSubmit={onSubmit}
                            >
                                {() => (
                                    <Form noValidate>
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="Enter Your Email Address"
                                            />
                                            <Input
                                                name="password"
                                                type="password"
                                                placeholder="Enter Your Password"
                                                bottom
                                            />
                                        <Button type="submit" label="Log in" loading={isLoading}/>
                                    </Form>
                                )}
                            </Formik>

                            <Link
                                to="/reset-password"
                                className="forgot_password"
                            >
                                Forgot password?
                            </Link>

                            <Divider/>
                            <div className="btn_wrapper" style={{width:'70%'}}>
                                <Button popup label="Create Account"/>
                            </div>

                        </div>

                        <Footer />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
