import React, {Component} from 'react';
import {SubHeader} from './SubHeader';
import {Header} from "../Header";
import axios from "axios";
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import {Success} from "../alert/Success";
import {Error} from "../alert/Error";


export class List extends Component {
    constructor(){
        super();
        this.state = {
            categories: [],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed:3,
            status: '',

    }
        this.handlePageChange =  this.handlePageChange.bind(this);
    };

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/category').
            then(response => {
                this.setState({
                    categories:response.data.data,
                    activePage:response.data.current_page,
                    itemsCountPerPage:response.data.per_page,
                    totalItemsCount:response.data.total,
                })
        })
    }

    onDelete(categoryId){
        axios.delete('http://127.0.0.1:8000/api/category/delete/'+categoryId).
            then(response =>{
                let categories = this.state.categories;
                for(let i = 0; i < categories.length; i++){
                    if(categories[i].id === categoryId){
                        categories.splice(i, 1);
                        this.setState({
                            categories
                        })
                    }
                }
                this.setState({
                    status: 'success'
                })
        }).catch(error => {
            this.setState({
                status: 'error',
            })
        });
    };

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        axios.get('http://127.0.0.1:8000/api/category/?page='+pageNumber).then(response =>{
            this.setState({
                categories:response.data.data,
                activePage:response.data.current_page,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
            });
        }).catch(error => console.log(error));
    }

    render() {
        const {categories} = this.state;
        return (
            <div>
                <Header/>
                <SubHeader />
                {this.state.status === 'success' ? <Success message={"Delete Successfully"}/> : null}
                {this.state.status === 'error' ? <Error message={"Unable to Delete"}/> : null}

                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Active</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            categories.map((category, key) => {
                                return(
                                    <tr className="record" key={key}>
                                        <th scope="row">{category.id}</th>
                                        <td>{category.name}</td>
                                        <td>{category.active ? "Active" :"Inactive"}</td>
                                        <td>{category.created_at}</td>
                                        <td>{category.updated_at}</td>
                                        <td>
                                            <a href="#" onClick={this.onDelete.bind(this, category.id)}>Delete</a> &nbsp;
                                            <Link to={`/category/edit/${category.id}`}>Edit</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center" >
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'

                    />
                </div>
            </div>
        );

    }
}
