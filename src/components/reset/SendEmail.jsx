import React, {useState} from 'react';
import Button from "@/components/common/Button/Button.jsx";
import {useToast} from "@/contexts/ToastContext.jsx";
import CodeService from "@/services/code.service.js";

export default function SendEmail({setVisible, userInfo}) {
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();
    const sendEmail = (email) => {
        setIsLoading(true);
        CodeService.sendCode(email).then(()=> {
            addToast("info", "Code Verification sent.");
            setVisible(2)
        }).catch(error => {
            addToast("error", error.response.data.code);
        }).finally(()=>{
            setIsLoading(false);
        })
    }
  return (
      <div className="reset_form">
          <div className="reset_form_header">Reset Your Password</div>
          <div className="reset_grid">
              <div className="reset_left">
                  <div className="reset_form_text">
                      How do you want to receive the code to reset your password?
                  </div>
                  <label htmlFor="email" className="hover1">
                      <input type="radio" name="" id="email" checked readOnly/>
                      <span className="label_col">
                          <span>Send code via email</span>
                          <span>{userInfo.email}</span>
                      </span>
                  </label>
              </div>
              <div className="reset_right">
                  <img src={userInfo.profilePhotoUrl} alt="avatar"/>
                  <span>{userInfo.email}</span>
                  <span>Supshare user</span>
              </div>
          </div>
          <div className="reset_form_btns">
              <Button label="Not You?" popup/>
              <Button onClick={()=>sendEmail(userInfo.email)} label="Continue" loading={isLoading} spinner_size="50"/>
          </div>
      </div>

  )
}
