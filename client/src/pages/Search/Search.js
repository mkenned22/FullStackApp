import React from "react";
import './style.css'

class Search extends React.Component {

    render() {
        return (
            <div class="body" >
                <div class="container" id="searchContainer">
                    <div class="row">
                        <div class="col-md-12">
                        <h1>Results for "Ireland"</h1>
                        <ul>
                            <li>
                                Where: Dublin, Ireland <br/>
                                Highlights: Definitely need to go the the Guinness Storehouse, Jameson Whiskey Distillery, and Kilmainham Gaul. If you are looking for a great meal, make sure to book reservations for Vintage Kitchen well in advance of your trip. <br/>
                                Changes: Nothing, I really enjoyed my time in Dublin.
                            </li>
                            <li>
                                Where: Galway, Ireland <br/>
                                Highlights: The Cliffs of Moher are only about an hour from Galway, would definitely recommend that. Additionally, I would make every effort to go to the Aryan Islands. Will most definitely be the highlight of your trip. Any bar on Shop Street in Galway will be great craic. Stop in the Queys for live music.<br/>
                                Changes: The only thing I would do differently is stay longer.
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;