import React from 'react';
import { Form, Formik } from "formik";
import { loginSchema } from "../schemas";
import "../assets/styles/pages/login.scss";
import Input from "../components/common/Input/Input.jsx";
import { motion } from "framer-motion";
import {Plus} from "../svg/index.jsx";
import Divider from "../components/common/Divider/Devider.jsx";
import {useDispatch} from "react-redux";
import {login} from "../slices/auth.js";
import Button from "../components/common/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const navigate = useNavigate();
    const onSubmit = (values) => {
        dispatch(login(values)).unwrap().then(()=> {
            navigate("/");
        })
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
                        <img src="/supshare.png" alt="logo" />
                    </motion.div>

                    <motion.div className="login_2" variants={childVariants}>
                        <div className="login_2_wrap">
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={loginSchema}
                                onSubmit={onSubmit}
                            >
                                {() => (
                                    <Form noValidate>
                                        <div>
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="Enter Your Email Address"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                name="password"
                                                type="password"
                                                placeholder="Enter Your Password"
                                                bottom
                                            />
                                        </div>
                                        <Button label="Log in" />
                                    </Form>
                                )}
                            </Formik>

                            <a
                                href="/forgot"
                                className="forgot_password"
                            >
                                Forgot password?
                            </a>

                            <Divider />

                            <Button popup label="Create Account" />

                        </div>

                        <footer
                            className="login_footer"
                        >
                            <div className="login_footer_wrap">
                                <a href="/">Francais (FR)</a>
                                <a href="/">English (EN)</a>
                                <a href="/">العربية</a>
                                <motion.div
                                    href="/"
                                    className="footer_square"
                                    whileHover={{scale:1.15}}
                                    whileTap={{scale:1}}
                                ><Plus color="#000000" /></motion.div>
                            </div>
                        </footer>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
