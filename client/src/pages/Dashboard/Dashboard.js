import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";

class NoMatch extends React.Component {

    render() {

        return (
            <Container fluid>
                <Row>
                    <Col size="md-4">
                        <h1>Welcome to your Dashboard</h1>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NoMatch;
