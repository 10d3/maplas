import { sendEmail } from "@/lib/actions/resend-email"

export default async function TestSend() {
    // async function send(){
    //     'use server'
    //     const data = await sendEmail()
    //     console.log(data)
    // }
  return (
    <div>
        <form>
            <button type="submit" >Send test email</button>
        </form>
    </div>
  )
}
