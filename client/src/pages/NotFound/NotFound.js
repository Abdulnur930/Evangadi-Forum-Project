import React from "react";
import Container from "react-bootstrap/Container";
function NotFound() {
  return (
    <Container Container className="my-5 py-5 text-left">
      <h1 className=" fw-bold">
        Sorry, the page you are looking for couldn't be found.
      </h1>
      <br />
      <p>Please go back to the home page and try again.</p>
    </Container>
  );
}

export default NotFound;
