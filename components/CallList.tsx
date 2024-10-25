'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import Loader from './Loader'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import { Toast } from './ui/toast'

function handleDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleString()
}

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter()
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()
  const [recordings, setRecordings] = useState<CallRecording[]>()
  const [isCallLoading, setIsCallLoading] = useState(false)

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
        return isCallLoading ? 'loading...' : 'No Recordings'
      default:
        return ''
    }
  }

  useEffect(() => {
    const fetchRecordings = async () => {
      setIsCallLoading(true)
      try {
        const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [])

        const recordings = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings)

        setRecordings(recordings)
      } catch (error) {
        Toast({ title: 'Failed to fetch recordings' })
      } finally {
        setIsCallLoading(false)
      }
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
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, idx) => (
          <MeetingCard
            key={(meeting as Call).id || idx}
            icon={type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? 'icons/upcoming.svg' : '/icons/recordings.svg'}
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={(meeting as Call).state?.startsAt?.toLocaleDateString() || handleDate((meeting as CallRecording).start_time)}
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            buttonIcon={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => window.open(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          ></MeetingCard>
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  )
}

export default CallList
