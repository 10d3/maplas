import Image from "next/image"
import Carousel from "./shadcnCaroussel"
import EventFilterSidebar from "./EventFilterSidebar"

export default function Hero() {

  const slides: string[] = ["/assets/image-slider1.jpg", "/assets/image-slider2.jpg", '/assets/image-slider3.jpg']
  return (
    <section className=" h-[30vh] md:h-[50vh] w-full mb-10 flex flex-col justify-around items-center relative rounded-sm ">
      <div className="absolute w-full h-full flex items-center rounded-sm">
        {/* <div className="flex w-full md:w-2/4 items-center justify-center"><EventFilterSidebar /></div> */}
        <Carousel autoSlide={true}>
          {[...slides.map((s: string) =>
            <Image className="w-full rounded-sm" priority key={s} src={s} height={1000} width={1000} alt="image slider" />
          )]}
        </Carousel>
      </div>
      <div className=" w-full flex md:pl-10 z-10 items-center justify-center md:justify-start md:items-start">
        <EventFilterSidebar />
      </div>
    </section>
  )
}
