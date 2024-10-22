import { useRouter } from 'next/navigation'
import React from 'react'

const CallList = ({type}: {type: 'ended' | 'upcoming' | 'recordings'}) => {
  
  const router = useRouter()
  
  return (
    <div>CallList</div>
  )
}

export default CallList  