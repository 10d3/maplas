'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { paymentValues } from "../constants"
import { withdrawSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaymentStripeCreator } from "@/lib/actions/orderAction"
import SelectCustom from "../ui/SelectCustom"
import { Loader } from "lucide-react"



export function Withdraw({ userId }: any) {
  const withdrawMethod = ['MonCash', "BankAccount"]
  const initiaValues = paymentValues
  const form = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: initiaValues
  })

  async function onSubmit(values: z.infer<typeof withdrawSchema>) {

    if (values.methodWithdraw == 'MonCash') {
      console.log(values.methodWithdraw)
    } else {
      const amount = Number(values.amount) as number
      const accountId = values.recipient.toString()
      const response = await PaymentStripeCreator(userId, amount, accountId)
      console.log(response)
    }

  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} method='post'>
        <Tabs defaultValue="account" className=" flex flex-col items-center md:min-w-[400px]">
          {/* <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">MonCash</TabsTrigger>
            <TabsTrigger value="password">Bank Account</TabsTrigger>
          </TabsList> */}
          <TabsContent value="account">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Withdraw</CardTitle>
                <CardDescription>
                  Retrait avec MonCash ou BankTransfer.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full space-y-2">
                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="methodWithdraw"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        {/* <FormLabel>Event Description</FormLabel> */}
                        <FormControl>
                          <SelectCustom {...field} defaultValue=''>
                            <option value='' hidden>Method de retrait</option>
                            {withdrawMethod.map(withdrawM => (
                              <option key={withdrawM} value={withdrawM}>{withdrawM}</option>
                            ))}
                          </SelectCustom>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipient"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        {/* <FormLabel>Event Title</FormLabel> */}
                        <FormControl>
                          <Input placeholder="bank or phone number" {...field} className="input-field" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        {/* <FormLabel>Event Title</FormLabel> */}
                        <FormControl>
                          <Input placeholder="amount" {...field} className="input-field" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled={form.formState.isSubmitting}
                  role='link' size='lg' className=' w-full my-2'
                > {
                    form.formState.isSubmitting ? <Loader /> : "Withdraw"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          {/* <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Bank Account</CardTitle>
                <CardDescription>
                  Virement Bancaire
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Withdraw</Button>
              </CardFooter>
            </Card>
          </TabsContent> */}
        </Tabs >
      </form>
    </Form >
  )
}
