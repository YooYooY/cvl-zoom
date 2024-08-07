'use client'
import { MeetingTypeList } from '@/components/MeetingTypeList'
import React, { useEffect, useState } from 'react'

const Home = () => {
  
  const [time,setTime]=useState('-')
  const [date, setDate] = useState('-')
  
  useEffect(()=>{
    if(navigator){
      const now = new Date()
      setTime(now.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: 'numeric', hour12: true }))
      setDate(new Intl.DateTimeFormat(navigator.language, { dateStyle: 'full' }).format(now))
    }
  },[])

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:20 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home
