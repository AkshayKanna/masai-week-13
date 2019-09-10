import React from "react";
import axios from "axios";
import { Route, Redirect, Link } from 'react-router-dom';

class Deductpage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product_name: "",
            product_id: "",
            product_quantity: "",
            deduct_quantity: "",
            array2: [],
            array1: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:3007/stock/show/${this.props.match.params.id}`,

        })
            .then((response) => {
                console.log(response.data)
                this.setState({
                    "product_name": response.data.user[0].product_name,
                    "product_id": response.data.user[0].product_id,
                    "product_quantity": response.data.user[0].product_quantity,
                    "brand": response.data.user[0].brand
                })

            })
    }

    deduct = (e) => {
        axios({
            method: 'get',
            url: 'http://localhost:3007/stock',
        })
            .then((response) => {
                console.log("response is", response.data.users
                )
                var array1 = response.data.users
                let ele = array1.find((item) => {
                    return item._id == this.props.match.params.id
                })
                console.log(this.props.match.params.id)
                console.log(ele);

                this.setState({
                    diff: ele.product_quantity
                })
                console.log(this.state.diff)
                var difference = this.state.diff - this.state.deduct_quantity;
                console.log(difference);

                axios({
                    method: "post",
                    url: `http://localhost:3007/stock/${this.props.match.params.id}`,
                    data: { product_name: this.state.product_name, product_id: this.state.product_id, product_quantity: difference, brand: this.state.brand }
                })
                    .then((response) => {
                        console.log(response.data.id)
                    })
                this.setState({
                    array2: response.data.id
                })
            })
            .catch((err) => alert(err))
    }
    render() {
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


                <div className="jumbotron">
                    <div className="container">
                        <p className="display-4">DEDUCT DETAILS</p>
                    </div>
                </div>

                <div className="container">
                    <form className="col-lg-5">
                        <div class="form-group">
                            <label>Product_Quantity</label>
                            <input type="text" name="product_name" class="form-control" placeholder="PRODUCT NAME" value={this.state.product_name} />
                        </div>
                        <div class="form-group">
                            <label>Product_Quantity</label>
                            <input type="text" name="product_id" class="form-control" placeholder="PRODUCT ID" value={this.state.product_id} />
                        </div>
                        <div class="form-group">
                            <label>Product_Quantity</label>
                            <input type="text" name="brand" class="form-control" placeholder="BRAND" value={this.state.brand} />
                        </div>
                        <div class="form-group">
                            <label>Product_Quantity</label>
                            <input type="text" name="deduct_quantity" class="form-control" placeholder="DEDUCT QUANTITY" value={this.state.deduct_quantity} onChange={(e) => this.setState({ deduct_quantity: e.target.value })} />
                        </div>
                        <button type="button" class="btn btn-primary btn-lg rounded-pill btn-block" onClick={this.deduct}>DEDUCT</button>

                    </form>
                </div>
            </div>
        )
    }
}
export default Deductpage;
