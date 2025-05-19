import React from 'react';
import {motion} from "framer-motion";
import "./Button.scss"

export default function Button({popup, ...props}) {
  return (
      <motion.button
          type="submit"
          className={popup ? "fancy-button popup" : "fancy-button"}
          whileHover={{scale: 1.02}}
          whileTap={{scale: 1}}
      >
          {props.label}
      </motion.button>
  )
}
