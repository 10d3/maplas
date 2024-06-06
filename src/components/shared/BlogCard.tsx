
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

export default function BlogCard({ data }: any) {
  return (
    <Card className=" hover:cursor-pointer flex flex-col md:flex-row w-full min-w-56 md:min-w-[40rem] max-w-3xl overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Link href="#" className="flex-shrink-0 w-full md:w-1/2 overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg" prefetch={false}>
        <Image
          src="/assets/image-slider2.jpg"
          alt="Blog Post Image"
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </Link>
      <CardContent className="flex flex-col justify-between flex-1 p-6">
        <CardTitle className="block mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
          <Link
            href="#"
            className=" hover:underline dark:text-gray-100"
            prefetch={false}
          >
            {data.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-gray-700 dark:text-gray-400 line-clamp-4">
          {data.content}
        </CardDescription>
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center">
            <Avatar className="mr-2">
              {/* <Image src="/placeholder.svg" alt="Author Avatar" /> */}
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Author</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}