import Influencerpage from "@/components/shared/Influencerpage";

export default function page() {

    return (
        <section className="flex flex-col gap-6 min-h-screen pt-20 w-full items-center ">
            <h1 className=" text-xl md:text-3xl font-medium">Influencer Model</h1>
            <div>
                <Influencerpage />
            </div>
        </section >
    )
}
