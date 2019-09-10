import React from "react";
import axios from "axios";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array1: [],
            array2: [],
            product_name: "",
            product_id: "",
            product_quantity: 0,
            brand: ""
        }
    }
    componentDidMount = (e) => {
        axios({
            method: 'get',
            url: 'http://localhost:3007/stock',
        })
            .then((response) => {
                console.log("response is", response.data.users
                )
                this.setState({
                    array1: [...response.data.users]
                });
            })
            .catch((err) => alert(err))
    }

    create = (e) => {

        axios({
            method: 'post',
            url: 'http://localhost:3007/stock/create',
            data: { product_name: this.state.product_name, product_id: this.state.product_id, product_quantity: this.state.product_quantity, brand: this.state.brand }
        })
            .then((response) => {
                console.log("response is", response.data.id
                )
                this.setState({
                    array2: response.data.id
                });
            })
            .catch((err) => alert(err))
        alert("Product Inserted")
    }

    render() {
        console.log(this.state.page3)
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
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#"></a>
                            </li>
                        </ul>
                    </div>
                </nav>


                <div className="jumbotron" style={{background: "linear-gradient(to left, #f43b47 0%, #453a94 100%)"}}>
                    <div className="container">
                        <p className="display-3" >STOCK MANAGEMENT SYSTEM</p>
                    </div>
                </div>
                <div style={{ marginTop: "100px" }}>
                    <div className="container">
                        <table class="table text-center table-bordered">
                            <thead class="thead-light ">
                                <tr>
                                    <th scope="col"> Object_Id</th>
                                    <th scope="col"> Product_Name</th>
                                    <th scope="col">Product_Id</th>
                                    <th scope="col">Product_Quantity</th>
                                    <th scope="col">Deduct</th>
                                </tr>
                            </thead>
                            <tbody >

                                {this.state.array1.map((items, index) => {
                                    return (
                                        <React.Fragment>
                                            <tr>
                                                <td onClick={() => this.props.history.push(`stock/show/${items._id}`)} key>{items._id}</td>
                                                <td>{items.product_name}</td>
                                                <td>{items.product_id}</td>
                                                <td>{items.product_quantity}</td>
                                                <td onClick={() => this.props.history.push(`/stock/deduct/${items._id}`)}>DEDUCT</td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })
                                }
                            </tbody>
                        </table>


                        <form>
                            <h1 className="mt-5">ADD DETAILS TO THE STOCK</h1>
                            <div class="form-group">
                                <label for="name">Product_Name</label>
                                <input name="product_name" type="text" class="form-control" id="product_name" placeholder="PRODUCT NAME" value={this.state.product_name} onChange={(e) => this.setState({ product_name: e.target.value })} />
                            </div>
                            <div class="form-group">
                                <label>Product_Id</label>
                                <input type="text" name="product_id" class="form-control" placeholder="PRODUCT ID" value={this.state.product_id} onChange={(e) => this.setState({ product_id: e.target.value })} />
                            </div>
                            <div class="form-group">
                                <label>Product_Quantity</label>
                                <input type="text" name="product_quantity" class="form-control" placeholder="PRODUCT QUANTITY" value={this.state.product_quantity} onChange={(e) => this.setState({ product_quantity: e.target.value })} />
                            </div>
                            <div class="form-group">
                                <label>Product_Brand</label>
                                <input type="text" name="brand" class="form-control" placeholder="BRAND" value={this.state.brand} onChange={(e) => this.setState({ brand: e.target.value })} />
                            </div>
                            <button type="button" class="btn btn-primary btn-lg rounded-pill btn-block" onClick={this.create}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}