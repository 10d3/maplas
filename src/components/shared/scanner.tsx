'use client'
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function ScannerApp({ tickets }: any) {
    const [scannedCodes, setScannedCodes] = useState<string[]>([]);
    const [matchedTickets, setMatchedTickets] = useState<any[]>([]);
    const [bgColor, setBgColor] = useState<string>('bg-white'); // Définir la couleur de fond par défaut en blanc

    useEffect(() => {
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 250 },
            false
        );

        const onScanSuccess = (decodedText: string, decodedResult: any) => {
            console.log("Scanned Code:", decodedText);

            const matchedTicket = tickets.find((ticket: any) => ticket.ticketId === decodedText);
            if (matchedTicket) {
                console.log("Ticket trouvé:", matchedTicket);
                setMatchedTickets([matchedTicket]);
                setBgColor('bg-green-500'); // Définir la couleur de fond en vert si le ticket est trouvé
            } else {
                console.log("Aucun ticket correspondant trouvé.");
                setMatchedTickets([]);
                setBgColor('bg-red-500'); // Définir la couleur de fond en rouge sinon
            }

            setScannedCodes((prevCodes) => [...prevCodes, decodedText]);
        };

        const onScanError = (errorMessage: string) => {
            console.error(errorMessage);
        };

        html5QrcodeScanner.render(onScanSuccess, onScanError);

        return () => {
            html5QrcodeScanner.clear().catch(error => console.error('Failed to clear scanner', error));
        };
    }, [tickets]);

    return (
        <div className={`flex items-center justify-center flex-col gap-4 h-screen ${bgColor}`}>
            <h1>QR Scanner</h1>
            <div id="reader" style={{ width: '100%' }}></div>
            <div>
                <h2>Scanned Codes:</h2>
                {/* <ul>
                    {scannedCodes.map((code, index) => (
                        <li key={index}>{code}</li>
                    ))}
                </ul> */}
            </div>
            <div>
                <h2>Matched Tickets:</h2>
                {matchedTickets.map((ticket, index) => (
                    <ul key={index}>
                        <li>{ticket.buyer?.name}</li>
                        {ticket.isVIPticket && (<li>VIP Person</li>)}
                    </ul>
                ))}
            </div>
        </div>
    );
}
