import React, {Component} from 'react';
import {SubHeader} from "./SubHeader";
import {Header} from "../Header";
import axios from 'axios';
import {Success} from "../alert/Success";
import {Error} from "../alert/Error";
export class Add extends Component{
    constructor(){
        super();
        this.state = {
            categoryName : '',
            status : '',
        }
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeCategoryName(e){
        this.setState({
            categoryName: e.target.value,
        })
    }

    onSubmitHandler(e){
        e.preventDefault();
        const  category = {
            categoryName : this.state.categoryName,
        }
        axios.post('http://127.0.0.1:8000/api/category/store', category).then(response =>{
            this.setState({
                status : 'success'
            })
        }).catch(error => {
            this.setState({
                status : 'error'
            })
        })
    }



    render(){
        return(
            <div>
                <Header/>
                <SubHeader />
                {this.state.status === 'success' ? <Success message={"Category Added Successfully"}/> : null}
                {this.state.status === 'error' ? <Error message={"Category Adding Failed"}/> : null}
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input className="form-control" id="category" placeholder="Category Name" onChange={this.onChangeCategoryName} value={this.state.categoryName} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );

    }
}