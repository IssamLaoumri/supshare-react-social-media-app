import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {changePasswordSchema} from "@/schemas/index.jsx";
import Input from "@/components/common/Input/Input.jsx";
import Button from "@/components/common/Button/Button.jsx";
import {useToast} from "@/contexts/ToastContext.jsx";
import UserService from "@/services/user.service.js";
import {useNavigate} from "react-router-dom";

export default function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();
    const navigate = useNavigate();

    const onSubmit = (values) => {
        setIsLoading(true);
        setTimeout(()=> {
            UserService.changePassword(values).then((data) => {
                addToast("info", data.code);
                navigate("/");
            }).catch(error => {
                addToast("error", error.response.data.code);
            }).finally(() => {
                setIsLoading(false);
            })
        }, 3000);
    };

    return (
      <div className="reset_form">
          <div className="reset_form_header">Change Your Password</div>
          <div className="reset_form_text">
              Pick a strong password
          </div>
          <Formik
              initialValues={{password: "", confirmPassword:""}}
              validationSchema={changePasswordSchema}
              onSubmit={onSubmit}
          >
              {() => (
                  <Form noValidate>
                      <Input
                          name="password"
                          type="password"
                          placeholder="New Password"
                      />

                      <Input
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm New Password"
                          bottom
                      />

                      <div className="reset_form_btns">
                          <Button label="Cancel" popup/>
                          <Button type="submit" label="Continue" loading={isLoading}/>
                      </div>
                  </Form>
              )}
          </Formik>
      </div>
  )
}
