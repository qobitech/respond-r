import React from 'react'
import './button-loader.scss'

const ButtonLoader: React.FC<React.ComponentPropsWithoutRef<'span'>> = ({
  ...props
}) => {
  return (
    <div className="loading">
      <span {...props}></span>
      <span {...props}></span>
      <span {...props}></span>
    </div>
  )
}

export default ButtonLoader
