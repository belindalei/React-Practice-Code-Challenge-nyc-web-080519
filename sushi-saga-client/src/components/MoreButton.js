import React from 'react'

const MoreButton = (props) => {

  const moreSushi = (e) => {
    props.getMoreSushi()
  }

    return <button onClick={moreSushi}>
            More sushi!
          </button>
}

export default MoreButton