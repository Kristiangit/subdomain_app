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
import { useState, useEffect } from "react"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  passwordConfirm: z.string()
}).refine((data) => {
    return data.password === data.passwordConfirm
}, {
    message: 'Passwords do not match',
    path: ['passwordConfirm']
}) 
type RowData = {
  name: string;
  ssh_port: string;
  web_port: string;
  user_id: string;
  password: string;
// status: string;
};
export default function Update() {
  const [info, setInfo] = useState<RowData>();

  useEffect(() => {
    async function logJSON() {
      const res = await fetch("/api/info/", {
        method: "GET",
    })
    const data = await res.json();
    console.log(data)

    setInfo(data)
    }  
    logJSON()
  }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
          passwordConfirm: "",
        },
      })
     
      // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (info) {
      console.log(values, info)
      sendUpdatePutRequest(values);
    } else {
      console.log("get fucked")
    }

    }
    async function sendUpdatePutRequest(form_data: z.infer<typeof formSchema>) {
      if (info?.user_id) {
        console.log(info.user_id)
        const res = await fetch("/api/update/", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            info: info,
            newName: form_data.username,
            })
          })
          const data = await res.json();
          console.log(data)
        }
      }


  return (
    <div className="w-screen h-screen flex justify-center items-center">
    <Card>
      <CardHeader>
        <span className="w-100 text-center">
          Update User Info
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
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
    {/* <button onClick={logJSON}>TEST</button> */}
    </div>

  )
}
