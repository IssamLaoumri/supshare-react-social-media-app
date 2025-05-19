import React from 'react';
import "./Divider.scss";

export default function Divider() {
  return (
      <div className="divider">
          <div className="line"></div>
          <span className="divider-text">OR</span>
          <div className="line"></div>
      </div>

  )
}
