import React from 'react';
import {motion} from "framer-motion";
import "./Button.scss"
import {Spinner} from "@/svg/index.jsx";

export default function Button({popup,loading, disabled, ...props}) {
  return (
      <motion.button
          onClick={props.onClick}
          type={props.type}
          className={(popup || disabled) ? "fancy-button popup" : "fancy-button"}
          disabled={(loading || disabled)}
          whileHover={(!loading || !disabled) ? {scale: 1.02} : {}}
          whileTap={(!loading || !disabled) ? {scale: 1} : {}}
      >
          {loading ? <Spinner size={props.spinner_size ? props.spinner_size : "200"}/> : props.label}
      </motion.button>

  )
}
