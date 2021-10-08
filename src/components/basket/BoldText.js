import React from 'react'

export default function BoldText({ bold, item }) {
  return (
    <>
      {bold ? <b>{item}</b> : item}
    </>
  )
}
