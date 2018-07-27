import React from "react";

class Dashboard extends React.Component {

    render() {

        return (
            <div class="container">
                <div class="row"><h1>Welcome to your Dashboard</h1></div>
                <div class="row">
                    <button type="button" class="btn btn-outline-primary"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a recent trip</button>
                    <div class="button"></div>
                </div>
            </div>
            
        )
    }
}

export default Dashboard;



