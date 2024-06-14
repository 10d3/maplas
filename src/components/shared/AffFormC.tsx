'use client'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import SelectCustom from "../ui/SelectCustom"
import { Button } from "../ui/button"
import { Loader } from "../ui/loader"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AffFormCValue, AffFormCSchema } from "@/lib/validation"

interface SelectCustomProps {
    influencers: any[]
    events: any[]
}
export default function AffFormC({ influencers, events }: SelectCustomProps) {

    const initialValues = AffFormCValue
    const form = useForm<z.infer<typeof AffFormCSchema>>({
        resolver: zodResolver(AffFormCSchema),
        defaultValues: initialValues,
    })
    async function onSubmit(values: any) {
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="event"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                {/* <FormLabel>Event Description</FormLabel> */}
                                <FormControl>
                                    <SelectCustom {...field} >
                                        <option value='' hidden>Select event type</option>
                                        {events.map(event => (
                                            <option key={event} value={event}>{event}</option>
                                        ))}
                                    </SelectCustom>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="influencer"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                {/* <FormLabel>Event Description</FormLabel> */}
                                <FormControl>
                                    <SelectCustom {...field} >
                                        <option value='' hidden>Select event type</option>
                                        {influencers.map(infuencer => (
                                            <option key={infuencer} value={infuencer}>{infuencer}</option>
                                        ))}
                                    </SelectCustom>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={form.formState.isSubmitting} className="">{form.formState.isSubmitting ? <Loader/> : "Create affiliate link"}</Button>
            </form>
        </Form >
    )
}
