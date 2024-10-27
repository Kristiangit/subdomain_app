"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { RowData } from "@/lib/utils"
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"

const formSchema = z.object({
  username: z.string(),
  password: z.string()
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    })
  const [info, setInfo] = useState<RowData>();
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    async function logJSON() {
      const res = await fetch("http://localhost:3000/api/info/", {
        method: "GET",
    })
    const data = await res.json();
    console.log(data)

    setInfo(data)
    }  
    logJSON()
  }, []);
    
    // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setValidation(false);
    if (info) {
      console.log(info)
      if (values.password === info.password && values.username === info.name) {
        return redirect(`/dashboard`);
      } else {
        setValidation(true);
      }
    }
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

      <span className={"text-red " + validation ? "hidden": "block"} >Incorrect username or password</span>
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
