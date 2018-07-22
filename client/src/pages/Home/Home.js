import React from "react";
import Nav from "../../components/Nav"
import Jumbotron from "../../components/Jumbotron"
import SignupModal from "../../components/SignupModal"
import LoginModal from "../../components/LoginModal"

class Home extends React.Component {

    render() {
        return (
            <div class="body">
                <Nav />
                <Jumbotron />
                <LoginModal />
                <SignupModal />
            </div>
        )
    }
}

export default Home;
