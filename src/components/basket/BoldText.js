import React from 'react'

export default function BoldText(props) {
  const { bold, item } = props
  return (
    <>
      {bold ? <b>{item}</b> : item}
    </>
  )
}
