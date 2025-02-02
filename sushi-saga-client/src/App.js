import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import SushiWallet from './containers/SushiWallet'; 

//state and fetch in app

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushi: [], 
    currentSushi: [],
    eatenSushi: [], 
    amountRemaining: 100
  }

  componentDidMount(){
    fetch(API)
      .then(resp => resp.json())
      //setState updates the values and then calls render
      .then(this.getNextSushi)
  }

  amountEaten = () => {
    let sushiPrices = this.state.eatenSushi.map(sushi => sushi.price)
    console.log("Sushi prices:", this.state.eatenSushi)
    
    // if (sushiPrices.length !== 0) {
      const sumOfPrices = (sum, num) => {
        return sum + num
      }

      let totalPrice = sushiPrices.reduce(sumOfPrices, 0)
      let amount = 100 - totalPrice
      return amount
    // } else {
    //   return 100 
    // }
  }

  getNextSushi = (sushiArr) => {
    let toRender = sushiArr.splice(0, 4)

    //set the new state to be the new Sushi array
    this.setState({
      sushi: sushiArr,
      currentSushi: toRender
    })
  }

  getMoreSushi = () => {
    let sushiCopy = [...this.state.sushi]
    this.getNextSushi(sushiCopy)
  }

  
  eatMoreSushi = (id) => {
    let sushiCopy = [...this.state.currentSushi]
    let matchingSushiIndex = sushiCopy.findIndex(sushi => parseInt(sushi.id) === parseInt(id))
    let matchingSushi = sushiCopy[matchingSushiIndex]
    
    if(matchingSushi === undefined){
      alert('already eaten!')
    } else {
      matchingSushi.img_url = ""
      this.setState({ 
        currentSushi: sushiCopy,
        eatenSushi: [...this.state.eatenSushi, sushiCopy[matchingSushiIndex]],
      })
    }

    //reduce the amount eaten 
    let amount = this.amountEaten()
  
    if (amount <= 0){
      alert('no more $$$')
    } else {
      this.setState({amountRemaining: amount})
    }
    
  }

  walletSubmitHandler = (amount) => {
    this.persistAmount(amount)
  }

  persistAmount= (amount) => {

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(
        amount
      )
    }

    fetch(API, options)
      .then(resp => resp.json())
      .then( amount => {
        let newAmount = parseInt(this.state.amountRemaining) + parseInt(amount.value)

        this.setState({
          amountRemaining: newAmount
        })
      })
  }

  render() {
    return (
      <div className="app">
      <SushiWallet submitHandler={this.walletSubmitHandler} />
      <SushiContainer currentSushi={this.state.currentSushi} getMoreSushi={this.getMoreSushi} key="sushi" eatMoreSushi={this.eatMoreSushi} />
      <Table eatenSushi={this.state.eatenSushi} amountRemaining={this.state.amountRemaining}/>
      </div>
    );
  }
}

//LONG WAY

// eatMoreSushi = (id) => {
//   let matchingSushi = this.state.currentSushi.find(sushi => parseInt(sushi.id) === parseInt(id))
//   let elementIndex = parseInt(matchingSushi.id) % 4
//   this.updateCurrentSushi(elementIndex)
// }

// updateCurrentSushi = (index) => {
//   let sushiCopy = [...this.state.currentSushi]

//   if(index === 0){
//     sushiCopy[3].img_url = ""
//   } else {
//     sushiCopy[index-1].img_url = ""
//   }

//   this.setState({currentSushi: sushiCopy })
// }
export default App;