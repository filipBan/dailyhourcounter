import styled from "styled-components";

import Card from "@material-ui/core/Card";
import Input from "@material-ui/core/Input";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #89cff0;
  min-height: 100vh;
  width: 100%;
`;

export const Logo = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 2;
  font-family: "Bungee", cursive;
  font-size: ${props => (props.fontSize ? props.fontSize : "7rem")};
`;

export const FormSection = styled.main`
  flex: 3;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media only screen and (min-width: 800px) {
    & {
      flex: 4;
    }
  }
`;

export const FormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 35rem;
  width: 95%;
  height: ${props => props.height};
  padding: 2rem;
  position: relative;

  a {
    font-size: 1.4rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: ${props => props.marginBottom};
  padding: 0 2rem;
`;

export const Progress = styled.div`
  width: 100%;
  height: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const StyledInput = styled(Input)`
  input {
    font-size: 1.6rem;
    padding-top: ${props => props.paddingtop || "0"};
  }
`;

export const TermsLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 2rem;

  a {
    margin-top: 1rem;
  }
`;

export const BottomLinks = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: ${props => props.marginBottom || "1rem"};
  padding-top: ${props => props.paddingTop};
`;
