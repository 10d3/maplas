import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function CardCarou({ data }: any) {
    console.log(data)
    return (
        <Card className=' flex flex-col items-center h-auto w-[220px]'>
            <CardHeader>
                <div className=' w-[200px]'>
                    <Image
                        priority
                        className='w-full h-[200px] object-cover object-center rounded-md'
                        width={1000} height={1000} src={data?.image} alt={data.name}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle className=' line-clamp-1'>{data.name}</CardTitle>
            </CardContent>
        </Card>
    )
}
