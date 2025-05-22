import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {findYourAccountSchema} from "@/schemas/index.jsx";
import Input from "@/components/common/Input/Input.jsx";
import Button from "@/components/common/Button/Button.jsx";
import {useToast} from "@/contexts/ToastContext.jsx";
import UserService from "@/services/user.service.js";
import {useNavigate} from "react-router-dom";

export default function SearchAccount({setVisible, setUserInfo}) {
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();
    const navigate = useNavigate();
    const onSubmit = (values) => {
        setIsLoading(true);
        setTimeout(()=> {
            UserService.findUser(values.email).then((res)=> {
                setUserInfo(res.data);
                addToast("info", "Account found !");
                setVisible(1);
            }).catch(error => {
                addToast("error", error.response.data.code);
            }).finally(()=>{
                setIsLoading(false);
            })
        }, 3000)
    };

    return (
      <div className="reset_form">
          <div className="reset_form_header">Find Your Account</div>
          <div className="reset_form_text">
              Please enter your email address to find your account.
          </div>
          <Formik
              initialValues={{email: ""}}
              validationSchema={findYourAccountSchema}
              onSubmit={onSubmit}
          >
              {() => (
                  <Form noValidate>
                      <Input
                          name="email"
                          type="email"
                          placeholder="Enter Your Email Address"
                      />

                      <div className="reset_form_btns">
                          <Button OnClick={()=> navigate("/")} label="Cancel" popup/>
                          <Button type="submit" label="Search" loading={isLoading} spinner_size="50" />
                      </div>
                  </Form>
              )}
          </Formik>
      </div>
  )
}
