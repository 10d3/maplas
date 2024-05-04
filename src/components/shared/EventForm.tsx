"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EventFormSchema } from "@/lib/validation"
import * as z from "zod"
import { eventDefaultValues } from "../constants"
import SelectCustom from "../ui/SelectCustom"
import { eventTypes } from "@/lib/eventTypes"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { FileUploader } from "./FileUpload"
import Image from "next/image"
import DatePicker from "react-datepicker";
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { createEvent } from "@/lib/actions/eventAction"



export type EventFormProps = {
  userId: string,
  type: "Create" | "Update"
}
export const EventForm = ({ userId, type }: EventFormProps) => {

  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);

  const initialValue = eventDefaultValues

  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: initialValue,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EventFormSchema>) {


    let uploadedImageUrl = values.image;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files)

      if (!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, image: uploadedImageUrl },
          userId,
          path: '/profile'
        })

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent?.id}`)
          // router.push("/event")
        }
      } catch (error) {
        console.log(error);
      }
    }

    // if (type === 'Update') {
    //   if (!eventId) {
    //     router.back()
    //     return;
    //   }

    //   try {
    //     const updatedEvent = await updateEvent({
    //       userId,
    //       event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
    //       path: `/events/${eventId}`
    //     })

    //     if (updatedEvent) {
    //       form.reset();
    //       router.push(`/events/${updatedEvent._id}`)
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-5 px-6">
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Title</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Event Title" {...field} className="input-field" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Description</FormLabel> */}
                  <FormControl>
                    <SelectCustom {...field} defaultValue=''>
                      <option value='' hidden>Select event type</option>
                      {eventTypes.map(eventTyp => (
                        <option key={eventTyp} value={eventTyp}>{eventTyp}</option>
                      ))}
                    </SelectCustom>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Description</FormLabel> */}
                  <FormControl className=" h-72">
                    <Textarea placeholder="Event Description" {...field} className=" textarea rounded-2xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Description</FormLabel> */}
                  <FormControl className=" h-72">
                    <FileUploader onFieldChange={field.onChange} image={field.value} setFiles={setFiles} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Title</FormLabel> */}
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image width={24} height={24} alt="location" src='/assets/icons/location-grey.svg' />
                      <Input placeholder="Event Location" {...field} className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Title</FormLabel> */}
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image className=" fill-neutral-300" width={24} height={24} alt="location" src='/assets/icons/calendar.svg' />
                      <p className="mx-3 whitespace-nowrap text-gray-600">Date:</p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat='MM/dd/yyyy h:mm aa'
                        wrapperClassName=" datePicker"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="vipTicketPrice"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Title</FormLabel> */}
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image width={24} height={24} alt="location" src='/assets/icons/dollar.svg' />
                      <Input
                        type="number"
                        placeholder="VIP Ticket Price Leave blank if you don't have vip ticket" {...field}
                        className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vipTicketCapacity"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Title</FormLabel> */}
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image width={24} height={24} alt="location" src='/assets/icons/dollar.svg' />
                      <Input
                        type="number"
                        placeholder="VIP Ticket Capacity Leave blank if you don't have vip ticket" {...field}
                        className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="standardTicketPrice"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Title</FormLabel> */}
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image width={24} height={24} alt="location" src='/assets/icons/dollar.svg' />
                      <Input
                        type="number"
                        placeholder="Standard Ticket Price " {...field}
                        className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="standardTicketCapacity"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormLabel>Event Title</FormLabel> */}
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image width={24} height={24} alt="location" src='/assets/icons/dollar.svg' />
                      <Input
                        type="number"
                        placeholder="Standart Ticket Capacity" {...field}
                        className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className=" col-span-2 w-full mb-6"
            type="submit"
            size='lg'
            disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting" : `${type} Event`}
          </Button>
        </form>
      </Form>
    </>
  )
}