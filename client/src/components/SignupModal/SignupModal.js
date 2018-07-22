import React from "react";

const modalStyle = {
    "position": "fixed",
    "top": "50%",
    "left": "50%",
    "transform": "translate(-50%, -50%)"
};

const containerStyle = {
    "padding": "30px",
    "max-width": "350px",
    "width": "100%",
    "background-color": "#F7F7F7",
    "margin": "0 auto",
    "border-radius": "2px",
    "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.3)",
    "overflow": "hidden",
    "font-family": "roboto"
}

const h1Style = {
    "text-align": "center",
    "font-size": "1.8em",
    "font-family": "roboto"
}

const submitStyle = {
    "width": "100%",
    "display": "block",
    "margin-bottom": "10px",
    "position": "relative",
    "border": "0px",
    "color": "#fff",
    "text-shadow": "0 1px rgba(0,0,0,0.1)",
    "background-color": "#4d90fe",
    "padding": "17px 0px",
    "font-family": "roboto",
    "font-size": "14px"
}

const textStyle = {
    "height": "32px",
    "font-size": "14px",
    "width": "100%",
    "margin-bottom": "8px",
    "border": "1px solid #d9d9d9",
    "border-top": "1px solid #c0c0c0",
    "padding": "0 8px",
    "color": "black"
}

class SignupModal extends React.Component {

    render() {

        return (
            <div id="signupModal" class="modal" style={modalStyle}>
                <div class="modal-dialog">
                    <div class="loginmodal-container" style={containerStyle}>
                        <h1 style={h1Style}>Create an Account</h1><br />
                        <form>
                            <input style={textStyle} type="text" name="firstName" placeholder="First Name" />
                            <input style={textStyle} type="text" name="lastName" placeholder="Last Name" />
                            <input style={textStyle} type="text" name="email" placeholder="Email" />
                            <input style={textStyle} type="password" name="pass" placeholder="Password" />
                            <input style={submitStyle} type="submit" name="login" class="login loginmodal-submit" value="Sign Up" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default SignupModal;