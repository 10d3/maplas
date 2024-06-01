'use client'
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CheckCheckIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import QrCodetoImage from '@/components/shared/qrcode';
import { formatDateTime } from '@/lib/utils';
import { Button } from '../ui/button';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

interface blaProps {
  ticket: any;
  event: any;
  session: any;
}

const Ticket = ({ ticket, event, session }: blaProps) => {
  const ticketRef = useRef<HTMLDivElement>(null); // Typing the reference

  function formatDateToYYYYMMDD(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function formatTimeToHHMM(date:Date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }


  const downloadTicket = async () => {
    const input = ticketRef.current;
    if (!input) {
      console.error('Ticket reference is null');
      return;
    }

    html2canvas(input, { scale: 2 }) // Increase scale for better quality
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('portrait', 'pt', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width / 3;
        const imgHeight = canvas.height / 3;
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(`${ticket.eventName}.pdf`);

      })
      .catch((error) => {
        console.error('Error generating PDF: ', error);
      });
  };

  const imageB = ticket.qrCodePath;
  const imageE = ticket.eventImage;
  const dateS = event.startDate;

  return (
    <section className='w-full flex flex-col gap-4 my-8 items-center justify-center h-auto'>
      <div id="ticket" ref={ticketRef} className="bg-[#6c47b8] text-white w-80 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6">
          <Image
            alt="Event Image"
            className="bg-contain rounded-lg w-[320px] h-[120px]"
            height={1000}
            src={imageE}
            width={1000}
          />
          <h2 className="text-2xl font-bold mt-4 flex items-center justify-between">
            {ticket.eventName}
            {ticket.isVIPticket ? (
              <span aria-label="VIP Ticket" role="img">
                <CheckCheckIcon className='size-6' />
              </span>
            ) : null}
            {/* <ShareIcon className="size-6" /> */}
          </h2>
          <p className="text-sm opacity-70">{event.createdBy.name}</p>
        </div>
        <div className="bg-[#8f7ad3] p-6">
          <div className="flex justify-between items-center border-b border-dashed border-white pb-4">
            <div>
              <p className="text-xs opacity-70">Location</p>
              <p>{event.location}</p>
            </div>
            <MapPinIcon className='size-6' />
          </div>
          <div className="flex justify-between items-center border-b border-dashed border-white py-4">
            <div>
              <p className="text-xs opacity-70">Name</p>
              <p>{session.user.name}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Date</p>
              <p>{formatDateTime(dateS).dateOnly}</p>
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div>
              <p className="text-xs opacity-70">Time</p>
              <p>{formatDateTime(dateS).timeOnly}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Dresscode</p>
              <p>Halloween</p>
            </div>
          </div>
        </div>
        <div className="bg-[#6c47b8] items-center p-4 flex flex-col gap-2">
          <p className="text-xs text-center opacity-70">SCAN QRCODE</p>
          <QrCodetoImage imageB={imageB} />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <Button onClick={downloadTicket} className="mt-4 p-2 text-white rounded">Download Ticket</Button>
        <AddToCalendarButton
          name={ticket.eventName}
          description={event.description}
          label='Add Event to Calendar'
          styleDark='#000'
          buttonStyle='3d'
          trigger='click'
          iCalFileName={ticket.eventName}
          options={['Apple', 'Google','iCal']}
          location={event.location}
          startDate={formatDateToYYYYMMDD(dateS)}
          endDate={formatDateToYYYYMMDD(event.endDate)}
          startTime={formatTimeToHHMM(dateS)}
          endTime={formatTimeToHHMM(event.endDate)}
          timeZone="America/Los_Angeles"
        ></AddToCalendarButton>
      </div>
    </section>
  );
};

export default Ticket;
