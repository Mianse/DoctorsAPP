import React from 'react';
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Calendar } from '@/components/ui/calendar'
import { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const BookAppointment = ({ doctor }) => {

  const [date, setDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()
  const { user } = useKindeBrowserClient()

  useEffect(() => {
    getTime()
  }, [])

  const saveBooking = () => {
    const data = {
      data: {}
    }
  }

  const isPastDay = (day) => {
    return day <= new Date();
  }

  const getTime = () => {
    const timeList = []
    for (let i = 1; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM'
      })

      timeList.push({
        time: i + ':30 AM'
      })
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ':00 PM'
      })

      timeList.push({
        time: i + ':30 PM'
      })
    }
    setTimeSlot(timeList)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full">
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div className='flex gap-5'>
              {/* Calendar */}
              <div className='flex-1 flex flex-col gap-3 items-baseline'>
                <h2 className='flex gap-2 items-center'>
                  <calendarDays className='text-primary h-5 w-5' />
                  Select date
                </h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isPastDay}
                  className="rounded-md border"
                />
              </div>
              {/* Time Slots */}
              <div className='flex-1 mt-3 md:mt-0'>
                <h2 className='flex gap-3 items-center mb-5'>
                  <Clock className='text-primary h-5 w-5' />
                  Select Time Slot
                </h2>
                <div className='grid grid-cols-3 gap-3 border rounded-lg p-3'>
                  {timeSlot && timeSlot?.map((item, index) => (
                    <h2 className={`p-2 border hover:bg-primary rounded-full text-center cursor-pointer hover:text-white ${item.time == selectedTimeSlot && 'bg-primary text-white'}`} onClick={() => setSelectedTimeSlot(item.time)} key={index}>{item.time}</h2>
                  ))}
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='sm:justify-end'>
          <DialogClose>
            <>
              <Button className='text-red-500 border-red-500' type="submit" variant='secondary'>Close</Button>
              <Button type="button" className='text-white bg-primary' variant='primary' disabled={!(date && selectedTimeSlot)}>Submit</Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
