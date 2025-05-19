import React from 'react';
import './Input.scss';
import { Error } from "../../../svg";
import { ErrorMessage, useField } from "formik";
import { motion, AnimatePresence } from "framer-motion";

export default function Input({ placeholder, bottom, ...props }) {
    const [field, meta] = useField(props);
    const showError = meta.touched && meta.error;

    return (
        <div className="input_wrap">
            {!bottom && (
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={showError ? 'error-top' : 'empty-top'}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: showError ? 'auto' : 0, opacity: showError ? 1 : 0 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="input_error_wrapper"
                    >
                        {showError && (
                            <div className="input_error">
                                <div className="error_content">{meta.error}</div>
                                <div className="error_arrow_top"></div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            )}

            <div className="input_box">
                <input
                    className={showError ? "input_error_border" : ""}
                    type={field.type}
                    name={field.name}
                    placeholder={placeholder}
                    {...props}
                    {...field}
                />
                {showError && (
                    <div className="error_icon">
                        <Error color="#FF474D" />
                    </div>
                )}
            </div>

            {bottom && (
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={showError ? 'error-bottom' : 'empty-bottom'}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: showError ? 'auto' : 0, opacity: showError ? 1 : 0 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="input_error_wrapper"
                    >
                        {showError && (
                            <div className="input_error">
                                <ErrorMessage name={field.name} />
                                <div className="error_arrow_bottom"></div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
