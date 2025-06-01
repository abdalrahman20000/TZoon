import React from "react";
import TextBox from "./TextBox";

const HyperlinkBox = (props) => {
  return <TextBox {...props} type="hyperlink" />;
};

export default HyperlinkBox;
