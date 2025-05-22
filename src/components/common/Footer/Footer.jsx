import React from 'react';
import {motion} from "framer-motion";
import {Plus} from "@/svg/index.jsx";
import "./Footer.scss"

export default function Footer() {
  return (
      <footer className="login_footer">
          <div className="login_footer_wrap">
              <a href="/">Francais (FR)</a>
              <a href="/">English (EN)</a>
              <a href="/">العربية</a>
              <motion.div
                  href="/"
                  className="footer_square"
                  whileHover={{scale: 1.15}}
                  whileTap={{scale: 1}}
              ><Plus color="#000000"/></motion.div>
          </div>
      </footer>
  )
}
