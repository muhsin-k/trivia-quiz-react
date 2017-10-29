import React from "react";
import { Header, Image } from "semantic-ui-react";
import constant from "../Constants";
const navBar = props => {
  return (
    <Header as="h2" color="teal" textAlign="center" block>
      <Image src={constant.appLogo} /> Trivia Quiz
    </Header>
  );
};

export default navBar;
