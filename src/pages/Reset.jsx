import "@/assets/styles/pages/reset.scss";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useToast} from "@/contexts/ToastContext.jsx";
import {logout} from "../slices/auth.js";
import SearchAccount from "@/components/reset/SearchAccount.jsx";
import SendEmail from "@/components/reset/SendEmail.jsx";
import React, {useState} from "react";
import CodeVerification from "@/components/reset/CodeVerification.jsx";
import Footer from "@/components/common/Footer/Footer.jsx";
import ChangePassword from "@/components/reset/ChangePassword.jsx";

export default function Reset() {
    const [visible, setVisible] = useState(0);
    const [userInfo, setUserInfo] = useState("");
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const onLogout = () => {
        dispatch(logout()).unwrap()
            .then(() => {
                addToast("info", `you have been signed out.`);
                navigate("/login");
            })
            .catch(() => {
                addToast("error", `An unexpected error occurred.`);
            })
    };
    console.log(userInfo)
  return (
      <div className="reset">
          <div className="reset_header">
              <img src="./supshare.png" alt="logo" />
              {user ? (
                  <div className="right_reset">
                      <Link to="/profile" >
                          <img src="./avatar-1.png" alt="avatar" />
                      </Link>
                      <button className="blue_btn" onClick={()=> onLogout()}>Logout</button>
                  </div>
              ) : (
                  <Link to="/login" className="right_reset">
                      <button className="blue_btn">Login</button>
                  </Link>
              )}
          </div>
          <div className="reset_wrap">
              {visible === 0 && (
                  <SearchAccount setVisible={setVisible} setUserInfo={setUserInfo}/>
              )}
              {visible === 1 && userInfo && (
                  <SendEmail setVisible={setVisible} userInfo={userInfo} />
              )}
              {visible === 2 && (
                  <CodeVerification setVisible={setVisible} userInfo={userInfo} />
              )}
              {visible === 3 && (
                  <ChangePassword />
              )}
              <Footer />
          </div>

      </div>
  )
}
