"use client"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfluencerSchema, InfluencerValue } from "@/lib/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";
import { influencer } from "@/lib/actions/become-influencer";

export default function OrganiInfluForm() {

    const initialValues = InfluencerValue
    const form = useForm<z.infer<typeof InfluencerSchema>>({
        resolver: zodResolver(InfluencerSchema),
        defaultValues: initialValues,
    })

    async function onSubmit(values: z.infer<typeof InfluencerSchema>) {
        try {
            const influencerResult = await influencer(values)
            if (influencerResult) {
                form.reset()
            }
        } catch (error:any) {
            throw new error
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
                        <FormField
                            control={form.control}
                            name="influencerName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Influencer Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Influencer name" {...field} className="input-field bg-white" />
                                    </FormControl>
                                    {/* <FormDescription>This is your public display influencer name.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tiktok"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Tiktok Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Link to your tiktok profile" {...field} className="input-field bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Instagram Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Link to your instagram profile" {...field} className="input-field bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="youtube"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Youtube Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Link to your youtube channel" {...field} className="input-field bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="twitter"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>X Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Link to your X profile" {...field} className="input-field bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Facebook Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Link to your facebook page or profile" {...field} className="input-field bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className=" bg-purple-500 hover:bg-fuchsia-500" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? <Loader /> : "Submit"}
                    </Button>
                </form>
            </Form>
        </>
    )
}
