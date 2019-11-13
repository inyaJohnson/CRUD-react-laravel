import React, {Component} from 'react';
import {Header} from "./Header";
import {Footer} from "./Footer";
export class About extends Component{
    render(){
        return(
            <div>
                <Header/>
                <div>This is a About</div>
                <Footer/>
            </div>
        );

    }
}