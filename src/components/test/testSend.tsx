import { sendEmail } from "@/lib/actions/resend-email"
import { Button } from "../ui/button"

export default async function TestSend() {
  const order = {
    buyerId:'clvualdh70000pzas3mjx9sqf'
  }
    async function send(){
        'use server'
        const data = await sendEmail(order)
        console.log(data)
    }
  return (
    <div>
        <form action={send}>
            <Button type="submit" >Send test email</Button>
        </form>
    </div>
  )
}
