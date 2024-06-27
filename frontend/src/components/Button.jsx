import React from 'react'

const Button = ({name,onClickFunction}) => {
  return (
    <>
     <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4  rounded mt-4' onClick={onClickFunction}>{name}</button>
    </>
  )
}

export default Button
