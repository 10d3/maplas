import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";

const Moncash = require("nodejs-moncash-sdk");
// require('./configure');

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const create_payment_json = req.body;

  console.log(create_payment_json)


  Moncash.configure({
    'mode': 'sandbox',
    'client_id': env.ClientId,
    'client_secret': env.ClientSecret,
  });

  try {

    const payment_creator = Moncash.payment;
    payment_creator.create(create_payment_json, function (error:any, payment:any) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log("Create Payment Response");
        console.log(payment_creator.redirect_uri(payment));
        const redirectURL = payment_creator.redirect_uri(payment);
        res.status(200).json({ redirect: { destination: redirectURL } });
      }
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ message: "Error creating payment" });
  }
}
