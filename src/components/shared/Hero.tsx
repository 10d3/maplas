import Image from "next/image"
import Carousel from "./shadcnCaroussel"
import EventFilterSidebar from "./EventFilterSidebar"

export default function Hero() {

  const slides: string[] = ["/assets/image-slider1.jpg", "/assets/image-slider2.jpg"]
  return (
    <section className=" h-[90vh] flex flex-col justify-around items-center ">
      <div className=" w-full flex flex-col md:flex-row items-center gap-6">
        <div className="flex w-full md:w-2/4 items-center justify-center"><EventFilterSidebar /></div>
        <Carousel autoSlide={true}>
          {[...slides.map((s: string) =>
            <Image className="w-full" priority key={s} src={s} height={1000} width={1000} alt="image slider" />
          )]}
        </Carousel>
      </div>
      <h3 className=" hidden text-xl">FEATURED EVENTS</h3>
    </section>
  )
}
