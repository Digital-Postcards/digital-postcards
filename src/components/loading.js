import React from 'react'
import img from '../img/loading.svg'
import '../styles/loading.css'

const Loading = () => {
  return (
    <div class = 'loading-container'>
        <img src={img} alt="loading" />
    </div>
  )
}

export default Loading