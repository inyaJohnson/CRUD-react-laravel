import React, {Component} from 'react';
import {SubHeader} from "./SubHeader";
import {Header} from "../Header";
import axios from 'axios';
import {Success} from "../alert/Success";
import {Error} from "../alert/Error";

export class Edit extends Component{
    constructor(props){
        super(props);
        this.state = {
            categoryName : '',
            status: '',
        }
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }



    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/category/edit/'+this.props.match.params.id).then(response => {
            this.setState({
                categoryName: response.data.name,
                status : 'success',
            })
        }).catch(error =>
            this.setState({
                status : 'error'
            })
        )
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
        axios.put('http://127.0.0.1:8000/api/category/update/'+this.props.match.params.id, category).then(response =>{
            this.setState({
                status : 'success'
            })
        }).catch(error => {
            this.setState({
                status: 'error'
            })
        })
    }



    render(){
        return(
            <div>
                <Header/>
                <SubHeader />
                {this.state.status === 'success' ? <Success message={"Category Edited Successfully"}/> : null}
                {this.state.status === 'error' ? <Error message={"Category Unable to Edit"}/> : null}                <form onSubmit={this.onSubmitHandler}>
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