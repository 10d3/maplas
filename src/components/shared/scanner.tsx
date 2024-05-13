'use client'
import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Button } from '../ui/button'

export default function Scanner() {

    const [resultData, setResultData] = useState<string>('')
    const [scanAgain, setScanAgain] = useState<boolean>(true)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        },
            false
        )

        scanner.render(success, error);
        function success(result: string) {
            scanner.clear();
            setResultData(result)
        }
        function error() {
            console.log("error")
        }
    }, [scanAgain])

    return (
        <div className='flex items-center justify-center flex-col gap-4'>
            <div><h1>scanner</h1></div>
            {resultData ?
                (<div>
                    {resultData}
                </div>) :
                (<div id='reader' className='w-[80%] h-[50%]'></div>)
            }
            <Button onClick={()=> { setScanAgain(!scanAgain)}}>Scan Again</Button>
        </div>
    )
}
