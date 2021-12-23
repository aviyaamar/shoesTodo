import React from "react";
import "../App.css"


class Shoes extends React.Component{ 
  render(){

    return(
      <div className="shoe-item">
        <h3>brand: {this.props.brand}</h3>
        <h3>size: {this.props.size}</h3>
        <h3>price: {this.props.price}</h3><br/>
        <button onClick={this.props.delete}>Delete</button>
      </div>

    )
  }
}
export default Shoes