'use client'
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CheckCheckIcon, MapPinIcon, ShareIcon } from 'lucide-react';
import Image from 'next/image';
import QrCodetoImage from '@/components/shared/qrcode';
import { formatDateTime } from '@/lib/utils';
import { Button } from '../ui/button';

interface blaProps{
    ticket: any;
    event: any;
    session: any;
}

const Ticket = ({ ticket, event, session }:blaProps) => {
  const ticketRef = useRef<HTMLDivElement>(null); // Typing the reference

  const downloadTicket = () => {
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
    <section className='w-full flex flex-col gap-4 my-8 items-center justify-center h-[90dvh]'>
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
          <p className="text-xs text-center opacity-70">SCAN BARCODE</p>
          <QrCodetoImage imageB={imageB} />
        </div>
      </div>
      <Button onClick={downloadTicket} className="mt-4 p-2 text-white rounded">Download Ticket</Button>
    </section>
  );
};

export default Ticket;
