"use server"
import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';

// Function to generate a QR code and save the image
export async function generateQRCode(eventId: string): Promise<string | null> {
  const content = `Event ID: ${eventId}`;
  const qrCodeDirectory = path.join(process.cwd(), 'public', 'qrcodes', eventId);

  await fs.mkdir(qrCodeDirectory, { recursive: true });

  console.log(qrCodeDirectory)

  function generateRandomName(length:number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomName = '';
    for (let i = 0; i <= length; i++) {
      randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomName;
  }

  const qrCodePath = path.join(qrCodeDirectory, `${eventId}_${generateRandomName(16)}.png`);

  try {
    // Create directory for the event if it doesn't exist
    // await fs.mkdir(qrCodeDirectory, { recursive: true });

    // Generate QR code
    // const qrCodePath = path.join(qrCodeDirectory, `${eventId}_${generateRandomName(16)}.png`);
    await QRCode.toFile(qrCodePath, content);

    // Return the path to the generated QR code image
    return qrCodePath.replace(process.cwd(), '');
  } catch (error) {
    console.error('Error generating and saving QR code:', error);
    return null;
  }
}
