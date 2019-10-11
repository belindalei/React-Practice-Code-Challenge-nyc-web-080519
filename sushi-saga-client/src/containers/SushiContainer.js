import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  console.log(props.eatenSushi)

  const renderSushi = () => {
    return props.currentSushi.map(sushiObj => < Sushi key={sushiObj.id} name={sushiObj.name} img={sushiObj.img_url} price={sushiObj.price} eatMoreSushi={props.eatMoreSushi} id={sushiObj.id} />)
  }

  return (
    <Fragment>
      <div className="belt">
        {renderSushi()}
        <MoreButton getMoreSushi={props.getMoreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer