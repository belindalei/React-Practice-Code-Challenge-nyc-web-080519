import React, { Fragment } from 'react'

const Sushi = (props) => {

  const clickHandler = (e) => {
    props.eatMoreSushi(e.target.id)
  }
  
  return (
    <div className="sushi">
      <div className="plate" 
           onClick={clickHandler}>
        { 
          /* Tell me if this sushi has been eaten! */ 
          // true ?
          //   null
          // :
            <img src={`${props.img}`} id={props.id} alt="" width="100%" />
        }
      </div>
      <h4 className="sushi-details">
        {props.name} - ${props.price}
      </h4>
    </div>
  )
}

export default Sushi