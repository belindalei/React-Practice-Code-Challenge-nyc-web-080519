import React from 'react';

class SushiWallet extends React.Component {

    state = {
      value: ""
    }

    myChangeHandler = (e) => {
      //capture the value that the user typed in 
      //update our state with that value/whatever version of that value we choose 
      let value = e.target.value
      this.setState({
        //since the key of value is the same as our value, we can just have it say value 
        value 
      })
    }

    submitHandler = (e) => {
      e.preventDefault()

      //passing in this.state because the state is an object above and it is all of the keys that need to be used to add money
      this.props.submitHandler(this.state)
    }

    //because it's a class I need a render, which is responsible for returning my JSX
    render() {

    return(
      <form className="form" onSubmit={this.submitHandler} >
        <h1>Add Money</h1>
        $<input
          type='number'
          placeholder="Amount of money to add"
          onChange={this.myChangeHandler}
          value = {this.state.value}
        />
        <input
          type='submit'
        />
      </form>
    )
  }
}


export default SushiWallet;
