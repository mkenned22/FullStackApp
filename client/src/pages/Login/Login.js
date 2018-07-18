import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Header from "../../components/Header";

class NoMatch extends React.Component {

  render() {

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Header/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NoMatch;
