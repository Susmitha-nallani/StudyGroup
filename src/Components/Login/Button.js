import React from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import logo from "../assests/company.jpg";
import Image from "../assests/xx.png";

const CenteredContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #cb9851;
  justify-content: center;
`;

const SectionContainer = styled.div`
  flex-direction: column;
  background-color: #cb9851;
  margin-top: 2%;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 43rem;
  height: 40rem;
  background-image: url(${Image});
  background-size: cover;
  background-position: center;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-color: #fff;
  width: 48rem;
  height: 40rem;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    padding: 2rem;
  }

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #888;
  padding: 5px;
  border-radius: 50px;
  backgroundcolor: black;
  @media (max-width: 600px) {
    margin-top: -5rem;
  }
`;

const Buttons = () => {
  return (
    <CenteredContainer>
      <SectionContainer>
        <RowContainer>
          <ImageContainer />
          <LoginContainer>
            <FormWrapper>
              <Logo src={logo} alt="Logo" />
              <ButtonWrapper>
                <Link to="/signup">
                  <Button
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      backgroundColor: "rgb(232,158,20)",
                      width: "100px",
                      height: "3rem",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#ffc14d",
                        color: "#fff",
                      },
                    }}
                  >
                    SignUp
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      backgroundColor: "rgb(232,158,20)",
                      width: "100px",
                      height: "3rem",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#ffc14d",
                        color: "#fff",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </ButtonWrapper>
            </FormWrapper>
          </LoginContainer>
        </RowContainer>
      </SectionContainer>
    </CenteredContainer>
  );
};

export default Buttons;
