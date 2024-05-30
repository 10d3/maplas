import { EmailTemplate } from '@/components/emailTemplates/Congrats';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async () =>{
    try {
        const {data, error} = await resend.emails.send({
            from:'AlloBillet <info@allobillet.app>',
            to:['ffast2000@gmail.com'],
            subject:'hello first test',
            react: EmailTemplate({firstName:'jhon'}),
            text:'',
        })
        if(error){
            return error
        }
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
