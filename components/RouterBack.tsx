'use client';
import React from 'react'
import Image from 'next/image'

const RouterBack = () => {
  return (
    <div className="absolute left-5 top-5 cursor-pointer" onClick={() => window.history.back()}>
      <Image src="/icons/right-icon.svg" alt="right" width={50} height={50} />
    </div>
  )
}

export default RouterBack
