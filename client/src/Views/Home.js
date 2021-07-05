import React from "react";
import { Container, Jumbotron } from "react-bootstrap/";
// import RegisterItem from '../Components/RegisterItem'
// import LoginItem from '../Components/LoginItem'

export const Home = () => {
  return (
    <Jumbotron fluid className="main-container">
      <Container>
        <h1>My PortFolio Website</h1>
        <h3>
          We are using React.js to develop this website and Its currently under
          development.
        </h3>
        <p>
          The main purpose of this website is to provide users a platform to
          create private portfolios.
        </p>
      </Container>
    </Jumbotron>
  );
};

export default Home;
