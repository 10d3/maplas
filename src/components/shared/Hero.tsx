
import { Button } from "../ui/button"

export default function Hero() {

  const intro = `life is short. find tickets.`
  const intro2 = `enjoy events. easy.`
  return (
    <section className=" h-[90vh] flex flex-col justify-around md:pt-14 md:pb-14 items-center ">
      <div className="flex flex-col items-center">
        <h1 className=" text-4xl md:text-5xl">{intro.toUpperCase()}</h1>
        <h1 className=" text-4xl md:text-5xl">{intro2.toUpperCase()}</h1>
      </div>
      {/* <div className=" hidden flex-col md:flex-row gap-4">
        <Input className="w-full" type="search" placeholder="Search Event, Location" />
        <Button type="submit">Search</Button>
      </div> */}
      <h3 className=" hidden text-xl">FEATURED EVENTS</h3>
    </section>
  )
}
