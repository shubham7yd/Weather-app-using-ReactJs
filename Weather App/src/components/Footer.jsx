import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <p className="footer-title">
        <span>© Weather {" "}</span>
        <span>{currentYear}</span>
        <span> | </span>
        <a className="accent-text" href="#" target="_blank">Shubham Kumar</a>
      </p>
    </div>
  );
}
