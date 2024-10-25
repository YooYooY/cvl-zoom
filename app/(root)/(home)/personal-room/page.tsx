'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

const Table = ({ title, description }: { title: string; description: string }) => {
  return (
    <dl className="flex flex-col items-start gap-2 xl:flex-row">
      <dt className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">{title}</dt>
      <dd className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{description}</dd>
    </dl>
  )
}

const PersonalRoom = () => {
  const router = useRouter()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const { toast } = useToast()

  const meetingId = user?.id

  const startRoom = useCallback(async () => {
    if (!client || !user) return
    const newCall = client.call('default', meetingId!)

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      })
    }

    router.push(`/meeting/${meetingId}?personal=true`)
  }, [client, user])

  const { call, isCallLoading } = useGetCallById(meetingId!)

  if (isCallLoading) return <Loader />

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">PersonalRoom</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({
              title: 'Link Copied',
            })
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom
