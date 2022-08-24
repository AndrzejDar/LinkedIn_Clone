import React from 'react'
import './Ad.scss'

const Ad = ({className, img}) => {
  return (
    <div className={className + ' asd__container'}>
        <img src={img} />
    </div>
  )
}

export default Ad