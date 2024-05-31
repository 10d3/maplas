import { EmailTemplate } from '@/components/emailTemplates/Congrats';
import { Resend } from 'resend';
import { PassThrough } from 'stream';

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

export const findPdf = (pdfBlob:any) => {
    return pdfBlob;
}

export async function sendPDF(pdfBuffer:any, ticketName:string) {
    try {
        const {data, error} = await resend.emails.send({
            from:'AlloBillet <info@allobillet.app>',
            to:['ffast2000@gmail.com'],
            subject:'hello first test',
            react: EmailTemplate({firstName:'jhon'}),
            text:'',
            attachments:[
                {
                    filename:ticketName,
                    content:pdfBuffer,
                }
            ]
        })
        if(error){
            return { success: false, error };
        }
        console.log(data)
        return { success: true };
    } catch (error) {
        console.log(error)
    }
  }