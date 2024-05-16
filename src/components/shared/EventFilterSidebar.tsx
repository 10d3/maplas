
import { prisma } from "@/db/prisma";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { eventFilterSchema } from "@/lib/validation";
import { eventTypes } from "@/lib/eventTypes";
import SelectCustom from "../ui/SelectCustom";

async function filterEvent(formData: FormData) {
  'use server'

  const values = Object.fromEntries(formData.entries())
  const { q, eventtype, location } = eventFilterSchema.parse(values)
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(eventtype && { eventtype: eventtype }),
    ...(location && { location: location }),
  })

  redirect(`?${searchParams.toString()}`)
}

export default async function EventFilterSidebar() {

  const distinctLocaions = (await prisma.event.findMany({
    where: {
      approved: true
    },
    select: {
      location: true,
    },
    distinct: ["location"]
  }).then(locations => locations.map(({ location }) => location).filter(Boolean),) as string[])


  return (
    <aside className="flex">
      <form action={filterEvent}>
        <div className="flex flex-col gap-3">
          <div className="flex">
            {/* <Label htmlFor='q'>Search</Label> */}
            <Input id="q" name="q" placeholder="Search event" />
          </div>
          <div className="flex">
            <SelectCustom id="eventtype" name="eventtype" defaultValue="">
              <option value="">Category</option>
              {eventTypes.map(eventType => (
                <option key={eventType} value={eventType}>{eventType}</option>
              ))}
            </SelectCustom>
          </div>
          <div className="flex">
            {/* <Label htmlFor='evenement'>Type Event</Label> */}
            <SelectCustom id="location" name="location" defaultValue="">
              <option value="">All location</option>
              {distinctLocaions.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </SelectCustom>
          </div>
          <Button type="submit">Filter Events</Button>
        </div>
      </form>
    </aside>
  )
}
