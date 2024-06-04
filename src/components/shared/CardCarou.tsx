import Image from 'next/image';
import { Card } from '../ui/card';

export default function CardCarou({ data }: any) {
    console.log(data)
    return (
        <Card className=' relative h-[218px] w-[218px] rounded-md'>
            <div className='absolute -z-1 rounded-md'>
                <Image
                    priority
                    className='w-full h-full object-cover object-center'
                    width={1000} height={1000} src={data?.image} alt={data.name}
                />
            </div>
            {/* <div className='relative h-full w-full top-[70%]'>
                <h3 className='text-white -z-10'>{data.name}</h3>
            </div> */}
        </Card>
    )
}
