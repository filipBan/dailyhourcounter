import React from "react";
import styled from "styled-components";

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

const isOpera = navigator.userAgent.indexOf("Opera") != -1;
const isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

console.log(window.navigator.userAgent);

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 10rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  background-color: white;
  padding: 2rem;
  display: flex;
  margin: 2rem;
`;

const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: center;

  p {
    line-height: 3rem;
  }

  img {
    width: 2rem;
  }
`;

const instructions = () => {
  if (isIos()) {
    return (
      <p>
        Tap on the{" "}
        <img src="https://firebasestorage.googleapis.com/v0/b/dailyhourcounter.appspot.com/o/menu_icon.png?alt=media&token=2e5dfc3c-cff8-4617-9080-93feb0e849fe" />{" "}
        icon below, and then scroll right to "Add to Home Screen"
      </p>
    );
  } else if (isOpera) {
    return (
      <p>
        Tap on the menu in top right corner and choose "Home Screen"
      </p>
    );
  } else if (isFirefox) {
    return (
      <p>
        Tap on the house icon in top right corner and choose "Add to
        Home Screen"
      </p>
    );
  } else {
    return null;
  }
};

const InstallInstructions = ({ open }) => {
  return open ? (
    <Container>
      <InnerContainer>{instructions()}</InnerContainer>
    </Container>
  ) : null;
};

export default InstallInstructions;
