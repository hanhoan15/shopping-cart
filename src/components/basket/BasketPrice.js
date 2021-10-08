import React from 'react'
import PropTypes from 'prop-types'
import BoldText from './BoldText'

export default function BasketPrice({ price, bold, title }) {

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

BasketPrice.propTypes = {
  price: PropTypes.number,
  bold: PropTypes.bool,
  title: PropTypes.string,
};

BasketPrice.defaultProps = {
  price: 0,
  bold: false,
  title: '',
};
