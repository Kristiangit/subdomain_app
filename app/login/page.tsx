"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Card, CardHeader, CardContent } from "../../components/ui/card"

import info from '/home/kristian/Dokumenter/Skole-Kode/TANK/subdomain-app/info.json'

const formSchema = z.object({
  username: z.string(),
  password: z.string()
}).refine((data) => {
  return data.password === info.password && data.username === info.name
}, {
  message: 'Incorrect username or password',
  path: ['password']
})

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })
     
      // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }


    return (
      <div className="w-screen h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <span className="w-100 text-center">
            Login
          </span>
        </CardHeader>
        <CardContent>
  
        
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </CardContent>
      </Card>
      </div>
  
    )
}
