import { Resend } from 'resend';
import {NextResponse} from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req){
    const response = await req.json()
    try {
        await data.emails.send({
            from: 'doctor_appointment_App',
            to: [response.data.Email], // resp is a global variable that contains
            subject: 'Appointment Booking confirmation',
            react: EmailTemplate({response}),
          })
        return  NextResponse.json({data})
    } catch (error) {
      return  NextResponse.json({error})
    }
}