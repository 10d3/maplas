'use client'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface CarouselProps {
    children: any;
    autoSlide?: boolean;
    autoSlideInterval?: number;
  }
export default function Carousel({
    children: slides,
    autoSlide = false,
    autoSlideInterval = 3000,
}:CarouselProps) {
    const [curr, setCurr] = useState(0)

    // if(!slides){
    //     throw new Error
    // }
    const prev = () =>
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
    const next = () =>
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])
    return (
        <div className="overflow-hidden relative w-full md:w-2/4 items-center justify-center">
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    onClick={next}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_:any, i:any) => (
                        <div
                            key={i}
                            className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}