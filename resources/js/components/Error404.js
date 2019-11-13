import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Header} from "./Header";
export class Error404 extends Component{
    render(){
        return(
            <div>
                <Header/>
                <div className="alert alert-danger" role="alert">
                    Page not found <Link to="/">Back to Home</Link>
                </div>
            </div>
        );
    }
}