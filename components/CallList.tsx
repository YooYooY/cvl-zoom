import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter()
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()
  const [recordings, setRecording] = useState<CallRecording[]>()

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls
      case 'recordings':
        return recordings
      case 'upcoming':
        return upcomingCalls
      default:
        return []
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls'
      case 'upcoming':
        return 'No Upcoming Calls'
      case 'recordings':
        return 'No Recordings'
      default:
        return ''
    }
  }

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [])

      const recordings = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings)

      setRecording(recordings)
    }

    if (type === 'recordings') {
      fetchRecordings()
    }
  }, [type, callRecordings])

  if (isLoading) return <Loader />

  const calls = getCalls()
  const noCallsMessage = getNoCallsMessage()

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? calls.map(()=>(
        <MeetingCard></MeetingCard>
      )) : (<h1 className='text-2xl font-bold text-white'>{noCallsMessage}</h1>)}
    </div>
  )
}

export default CallList
