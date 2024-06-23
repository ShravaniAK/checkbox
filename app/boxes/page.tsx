import React from 'react'

const Boxes = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-evenly ">
      <div className="red-box w-24 h-24 bg-red-600 animate-spin"></div>
        <div className="blue-box w-24 h-24 bg-blue-600 animate-enlarge-shrink"></div>
    </div>
  )
}

export default Boxes