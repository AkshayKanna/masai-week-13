import React from "react";
import axios from "axios";
import { Route, Redirect, Link } from 'react-router-dom';

class Showpage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product_name: "",
            product_id: "",
            product_quantity: "",
            array1: [],
            array2: []
        }
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:3007/stock/show/${this.props.match.params.id}`,

        })
            .then((response) => {
                const obj = {
                    product_name: response.data.user.product_name,
                    product_id: response.data.user.product_id,
                    product_quantity: response.data.user.product_quantity,
                    brand: response.data.user.brand
                }
                console.log("reponse is", response.data.user)
                this.setState({
                    array1: [...response.data.user],
                    array2: [...this.state.array2, obj]
                });
            })
            .catch((err) => alert(err))
    }
    render() {
        console.log(this.state.array1)
        console.log(this.state.array2)
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light ">
                    <a class="navbar-brand" href="#">SMS</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <Link to="/"><a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h1 className="display-3 text-center">USER DETAILS</h1>
                <div className="container-fluid">
                    <table class="table text-center table-bordered">
                        <thead class="thead-light ">
                            <tr>
                                <th scope="col"> PRODUCT NAME</th>
                                <th scope="col"> PRODUCT ID</th>
                                <th scope="col">PRODUCT QUANTITY</th>
                                <th scope="col">BRAND</th>
                            </tr>
                        </thead>
                        <tbody >

                            {this.state.array1.map((items, index) => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <td>{items.product_name}</td>
                                            <td>{items.product_id}</td>
                                            <td>{items.product_quantity}</td>
                                            <td>{items.brand}</td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Showpage;