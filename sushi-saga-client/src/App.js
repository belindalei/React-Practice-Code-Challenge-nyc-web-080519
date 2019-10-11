import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

//state and fetch in app

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushi: [], 
    currentSushi: [],
    eatenSushi: []
  }

  componentDidMount(){
    fetch(API)
      .then(resp => resp.json())
      //setState updates the values and then calls render
      .then(this.getNextSushi)
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
    
    if(matchingSushi.img_url === undefined){
      alert('already eaten!')
    } else {
      matchingSushi.img_url = ""
    }
    
    this.setState({ 
      currentSushi: sushiCopy,
      eatenSushi: [...this.state.eatenSushi, sushiCopy[matchingSushiIndex]] 
    })
    console.log(this.state.eatenSushi)
  }
  
  
  
  render() {
    return (
      <div className="app">
      <SushiContainer currentSushi={this.state.currentSushi} getMoreSushi={this.getMoreSushi} key="sushi" eatMoreSushi={this.eatMoreSushi} />
      <Table />
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