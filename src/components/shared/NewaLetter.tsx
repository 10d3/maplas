'use client'
import React from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewsletterSchema, NewsletterValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsLetterAction } from "@/lib/actions/NewsLetter";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

export default function NewsLetter() {

    const initiaValues = NewsletterValues
    const form = useForm<z.infer<typeof NewsletterSchema>>({
        resolver: zodResolver(NewsletterSchema),
        defaultValues: initiaValues
    })

    async function onSubmit(values: z.infer<typeof NewsletterSchema>) {
        try {
            const result = await NewsLetterAction(values)
            if (result) {
                form.reset()
            }
        } catch (error) {
            return error
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2 flex-col gap-2 w-3/4 items-center">
                <div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                {/* <FormLabel>Email</FormLabel> */}
                                <FormControl>
                                    <Input placeholder='email' {...field} className=' input-field bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="bg-custom-button-secondary hover:bg-custom-button-secondary w-2/4" disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting ? <Loader /> : "Je m'inscris"}</Button>
            </form>
        </Form>
    )
}
