import React from 'react'
import BoldText from './BoldText'

export default function BasketPrice(props) {
  const { price, bold, title } = props

  return (
    <div className="row">
    <div className="col-2">
      <BoldText bold={bold} item={title}></BoldText>
    </div>
    <div className="col-1 text-right">
      $<BoldText bold={bold} item={price.toFixed(2)}></BoldText>
    </div>
  </div>
  )
}
