import React, {useRef, useState} from 'react';
import { Formik, Form } from "formik";
import { codeSchema } from "@/schemas/index.jsx";
import Button from "@/components/common/Button/Button.jsx";
import CodeService from "@/services/code.service.js";
import {useToast} from "@/contexts/ToastContext.jsx";
import {useNavigate} from "react-router-dom";

export default function CodeVerification({userInfo, setVisible}) {
    const inputsRef = useRef([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();
    const navigate = useNavigate();


    const onSubmit = (values) => {
        setIsLoading(true);
        setTimeout(()=> {
            CodeService.verifyCode({code: values.code, email: userInfo.email}).then((data) => {
                addToast("info", data.code);
                setVisible(3);
            }).catch(error => {
                addToast("error", error.response.data.code);
            }).finally(() => {
                setIsLoading(false);
            })
        }, 3000);
    };

    return (
        <div className="reset_form">
            <div className="reset_form_header">Code Verification</div>
            <div className="reset_form_text">
                Please enter the code sent to you.
            </div>

            <Formik
                initialValues={{ code: "" }}
                validationSchema={codeSchema}
                onSubmit={onSubmit}
            >
                {({ values, setFieldValue, submitForm }) => {
                    const handleChange = (index, value) => {
                        if (!/^\d?$/.test(value)) return;

                        const codeArray = values.code.split("");
                        codeArray[index] = value;
                        const newCode = codeArray.join("").padEnd(5, "");
                        setFieldValue("code", newCode);

                        // Focus next input
                        if (value && index < 4) {
                            inputsRef.current[index + 1]?.focus();
                        }

                        // Auto-submit if all digits are entered
                        if (newCode.replace(/\s/g, "").length === 5) {
                            setTimeout(() => {
                                submitForm();
                            }, 100); // slight delay to ensure last digit is registered
                        }
                    };

                    const handleKeyDown = (index, e) => {
                        if (e.key === "Backspace" && !values.code[index] && index > 0) {
                            inputsRef.current[index - 1]?.focus();
                        }
                    };

                    const handlePaste = (e) => {
                        e.preventDefault();
                        const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
                        if (paste.length === 0) return;

                        const codeArray = paste.split("");
                        const fullCode = paste.padEnd(5, "");
                        setFieldValue("code", fullCode);

                        // Focus after paste
                        codeArray.forEach((char, idx) => {
                            inputsRef.current[idx]?.focus();
                        });

                        // Auto-submit
                        if (paste.length === 5) {
                            setTimeout(() => {
                                submitForm();
                            }, 100);
                        }
                    };

                    const isCodeComplete = values.code.length === 5 && /^[0-9]{5}$/.test(values.code);

                    return (
                        <Form noValidate>
                            <div className="verify-email__code">
                                {[0, 1, 2, 3, 4].map((index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        className="verify-email__digit"
                                        value={values.code[index] || ""}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                    />
                                ))}
                            </div>

                            <div className="reset_form_btns">
                                <Button OnClick={()=> navigate("/")} label="Cancel" popup />
                                <Button
                                    type="submit"
                                    label="Continue"
                                    loading={isLoading}
                                    disabled={!isCodeComplete}
                                />
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}
