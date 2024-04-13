import React, { useState, useEffect } from 'react';
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"


import GlobalApi from '@/app/_Utils/GlobalApi';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';



const BookAppointment = ({ doctor }) => {

  const [date, setDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState()
  const [note, setNote] = useState('')

  const {user} =  useKindeBrowserClient();
   
  const SaveBooking=()=>{

    const data = {
        data:{
            userName: user.given_name + " " + user.family_name,
            Email: user.email,
            Time: selectedTimeSlot,
            Date: date,
            doctor: doctor.id,
            Note: note
        }
        
      }
      GlobalApi.booKAppointment(data).then(resp => {
        console.log(resp)
        if (resp) {
            console.log(data);
           GlobalApi.sendEMail(data).then(resp =>{
            console.log(resp)
           })
          toast("message sent via email")
        }
      })
  }
  
  

  const isPastDay = (day) => {
    return day <= new Date();
  }

  useEffect(() => {
    getTime()
  }, [])

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
    <Dialog className="w-120 h-auto">
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
                <div className='grid grid-cols-5 gap-5 border rounded-lg p-3'>
                  {timeSlot && timeSlot?.map((item, index) => (
                    <h2 className={`p-2 border hover:bg-primary rounded-full text-center cursor-pointer hover:text-white ${item.time == selectedTimeSlot && 'bg-primary text-white'}`} onClick={() => setSelectedTimeSlot(item.time)} key={index}>{item.time}</h2>
                  ))}
                </div>
              </div>
            </div>
          </DialogDescription>
          <Textarea placeholder="Type your message here." value={note} onChange={e => setNote(e.target.value)} />
        </DialogHeader>
        <DialogFooter className='sm:justify-end'>
          <DialogClose>
            <>
              <Button className='text-red-500 border-red-500' type="submit" variant='secondary'>Close</Button>
              <Button type="button" className='text-white bg-primary p-5' onClick={SaveBooking} variant='primary' disabled={!(date && selectedTimeSlot)}>Submit</Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
