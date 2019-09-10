import React from "react"
import { Route, Redirect, Link } from 'react-router-dom';
import Homepage from "./Homepage"
import Deductpage from "./Deductpage"
import Showpage from "./Showpage"

class App extends React.Component
{
    render()
    {
        return(
            <div>
               <Route exact path="/" component={Homepage}></Route>
               <Route exact path="/stock/deduct/:id" component={Deductpage}/>
               <Route exact path="/stock/show/:id" component={Showpage}/>
            </div>
        );
    }
}   
export default App;