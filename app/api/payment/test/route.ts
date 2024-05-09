import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { env } from "process";

const Moncash = require("nodejs-moncash-sdk");

export const POST = async function (req: Request, res: NextApiResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  const body = await req.json();

  const create_payment_json = body;

  console.log(create_payment_json);

  Moncash.configure({
    mode: "sandbox",
    client_id: env.ClientId,
    client_secret: env.ClientSecret,
  });

  try {
    const payment_creator = Moncash.payment;
    const redirectURL = await new Promise((resolve, reject) => {
      payment_creator.create(create_payment_json, (error: any, payment: any) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Create Payment Response");
          console.log(payment_creator.redirect_uri(payment));
          const redirectURL = payment_creator.redirect_uri(payment);
          resolve(redirectURL);
        }
      });
    });
    return NextResponse.json({ redirect: { destination: redirectURL } }, { status: 200 });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json({ message: "Error creating payment", error }, { status: 500 });
  }
};
