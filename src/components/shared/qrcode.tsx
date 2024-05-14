'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QrCodetoImage({ imageB }: any) {

    const [qrCodep, setQrCodep] = useState<string>('');
        QRCode.toDataURL(imageB as string).then(setQrCodep)

    return (
        <Image
            alt="Halloween Party"
            className=" bg-contain rounded-lg w-[80px] h-[74px]"
            height={1000}
            src={qrCodep}
            width={1000}
        />
    )
}
