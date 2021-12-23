import React from "react";
import shoesApi from './component/Api.js';
import Input from "./component/Input.js";
import Shoes from "./component/shoes";

class App extends React.Component{
  state = {
    shoesList: [], brand:"", price:0, size:0}

 async componentDidMount(){
   try{
    const {data} = await shoesApi.get("shoes");
    this.setState({shoesList: data})
   }
   catch(e){
     console.log(e)

   }
   
  }

  displayItems(){
    return this.state.shoesList.map((shoe)=>{
      return <div key={shoe.id}>
              <Shoes 
              brand = {shoe.brand}
              size = {shoe.size}
              price = {shoe.price}
              delete= {()=>this.delete(shoe.id)}
              update={this.update}
            />
         </div>
    })
  }

  valueNewShoes = (objProp, e) =>{
    this.setState({[objProp]: e})
    console.log(this.state.brand)
  }

  create = async() =>{
    try{
      let shoesCopy = [...this.state.shoesList] 
      let newShoes = {
        brand: this.state.brand, 
        size: this.state.size, 
        price: this.state.price
      }
      await shoesApi.post('/shoes', newShoes)
      shoesCopy.push(newShoes)
      this.setState({shoesList: shoesCopy})
    }
    catch(e)
    {
      console.log(e)
    }

  }
  delete = async(id) =>{
    try{
      await shoesApi.delete(`/shoes/${id}`)
      let shoesList = this.state.shoesList
      const filterdShoes = shoesList.filter((shoe)=>{
       return (shoe.id !== id)
      })
      this.setState({shoesList:filterdShoes})
    }
    catch(e){
      console.log(e)
    }

  }
  render(){

    return(
      <div>
        <div className="Add-shoes">
        <Input label="brand"onChange={(e)=>{ this.valueNewShoes("brand", e.target.value)}} />
        <Input label="size" onChange={(e)=>{ this.valueNewShoes("size", e.target.value)}} />
        <Input label="price" onChange={(e)=>{ this.valueNewShoes("price", e.target.value)}} />



          <button onClick={this.create}>ADD</button>
        </div>
        {this.displayItems()}
      </div>

    )
  }
}
export default App