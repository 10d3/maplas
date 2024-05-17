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

export function Withdraw() {
  return (
    <Tabs defaultValue="account" className=" flex flex-col items-center md:min-w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">MonCash</TabsTrigger>
        <TabsTrigger value="password">Bank Account</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>MonCash</CardTitle>
            <CardDescription>
              Retrait avec MonCash.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">MonCash Number</Label>
              <Input id="username" defaultValue="50944758595" type="number" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Withdraw</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
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
      </TabsContent>
    </Tabs>
  )
}
