import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export default function CardCarou({ data }: any) {
    console.log(data)
    return (
        <Card className=' relative h-[218px] w-[218px]'>
            <div className='absolute -z-1'>
                <Image
                    className=' w-full h-full object-cover object-center rounded-md'
                    width={1000} height={1000} src={data?.image} alt={data.name}
                />
            </div>
            <div className='relative h-full w-full top-[70%]'>
                    <h3 className='text-white -z-10'>{data.name}</h3>
            </div>
        </Card>
    )
}
