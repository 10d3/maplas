import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';

// Function to generate a QR code and save the image
export async function generateQRCode(eventId: string): Promise<string | null> {
  const content = `Event ID: ${eventId}`;
  const qrCodeDirectory = path.join(process.cwd(), 'public', 'qrcodes', eventId);

  await fs.mkdir(qrCodeDirectory, { recursive: true });

  function generateRandomName(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomName = '';
    for (let i = 0; i <= length; i++) {
      randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomName;
  }

  const qrCodeFileName = `${eventId}_${generateRandomName(16)}.png`;
  const qrCodePath = path.join(qrCodeDirectory, qrCodeFileName);
  const qrCodePublicPath = path.join('/qrcodes', eventId, qrCodeFileName).replace(/\\/g, '/'); // Convert backslashes to forward slashes

  try {
    await QRCode.toFile(qrCodePath, content);

    // Return the public path to the generated QR code image
    return qrCodePublicPath;
  } catch (error) {
    console.error('Error generating and saving QR code:', error);
    return null;
  }
}
