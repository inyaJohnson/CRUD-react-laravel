import React, {Component} from 'react';
import {Header} from "./Header";
import {Footer} from "./Footer";
export class Home extends Component{
    render(){
        return(
            <div>
                <Header/>
                <div>This is a Home</div>
                <Footer/>
            </div>
        );
    }
}