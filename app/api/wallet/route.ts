// // app/api/wallet/route.js
// import { NextResponse } from 'next/server';
// import { GoogleAuth } from 'google-auth-library';
// import jwt from 'jsonwebtoken';

// // Securely load sensitive information
// const serviceAccount = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT!;

// export async function POST(req:Request) {
//   const { type, passData } = await req.json();

//   if (type === 'google') {
//     try {
//       const auth = new GoogleAuth({
//         credentials: serviceAccount,
//         scopes: 'https://www.googleapis.com/auth/wallet_object.issuer',
//       });

//       const jwtPayload = {
//         iss: serviceAccount.client_email,
//         aud: 'google',
//         typ: 'savetowallet',
//         payload: passData, // Ensure passData is properly structured
//       };

//       const token = jwt.sign(jwtPayload, serviceAccount.private_key, { algorithm: 'RS256' });
//       const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

//       return NextResponse.json({ saveUrl });
//     } catch (error) {
//       console.error("Google Wallet generation failed:", error);
//       return NextResponse.json({ error: 'Failed to generate Google Wallet pass' }, { status: 500 });
//     }
//   } else {
//     return NextResponse.json({ error: 'Invalid wallet type' }, { status: 400 });
//   }
// }