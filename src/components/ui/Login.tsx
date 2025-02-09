"use client"

import { useState } from "react"
import Window from "../common/Window"
import Image from "next/image"

export default function Login() {


  return (
    <Window childrenName="MSN">
      <div
      style={{background:"linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(208, 221, 240, 1) 50%, rgba(255, 255, 255, 1) 100%)"}}
      
      className="mx-auto max-w-md p-2  rounded-sm ">
        <LoginTop></LoginTop>
        <div className="flex flex-col justify-center items-center">
          <div className="border-[1px] border-gray-500 rounded-lg bg-[#FEFEFE]">
            <Image
              alt="msnLogin"
              src={"/msnpersonlogo.png"}
              width={"120"}
              height={"120"}
            ></Image>
          </div>
       
       
       
          <LoginForm></LoginForm>
        </div>

        <LoginFooter></LoginFooter>
      </div>
    </Window>
  );
}



function LoginTop() {
    return ( <div className="flex gap-3 items-center mb-7">


        <Image src={"/MSN_logo.webp"} width={35} height={12} alt="msn logo" ></Image>
        <p className="bold text-[10px]">Messenger</p>
    </div> );
}



function LoginForm() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("online")
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Handle login logic here
    }
    return (
        
        <form onSubmit={handleSubmit} className="space-y-1">
        <div className="space-y-1">
          <label htmlFor="email" className="text-xs    text-darkLabel">
            E-mail address:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded  px-2 py-1 text-sm  focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm text-[#000F35]">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-[#7B9EC7] px-2 py-1 text-sm focus:border-[#003797] focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="status" className="text-sm text-[#000F35]">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded border border-[#7B9EC7] bg-white px-2 py-1 text-sm focus:border-[#003797] focus:outline-none"
          >
            <option value="online">Online</option>
            <option value="busy">Busy</option>
            <option value="away">Away</option>
            <option value="offline">Appear Offline</option>
          </select>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="h-4 w-4 rounded border-[#7B9EC7]" />
            <label htmlFor="remember" className="text-[#000F35]">
              Remember Me
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember-password" className="h-4 w-4 rounded border-[#7B9EC7]" />
            <label htmlFor="remember-password" className="text-[#000F35]">
              Remember my Password
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="auto-login" className="h-4 w-4 rounded border-[#7B9EC7]" />
            <label htmlFor="auto-login" className="text-[#000F35]">
              Sign me in automatically
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="rounded border border-[#7B9EC7] bg-gradient-to-b from-[#FEFEFE] to-[#E2E2E2] px-8 py-1 text-sm text-[#000F35] hover:from-[#E2E2E2] hover:to-[#FEFEFE] active:from-[#E2E2E2] active:to-[#E2E2E2]"
          >
            Sign In
          </button>
        </div>
      </form>
);
}




function LoginFooter() {
    return (    <div className="mt-6 flex justify-between text-sm">
        <div className="space-y-1">
          <a href="#" className="block text-[#003797] hover:underline">
            Forgot your password?
          </a>
          <a href="#" className="block text-[#003797] hover:underline">
            Service Status
          </a>
        </div>
        <a href="#" className="text-[#003797] hover:underline">
          Get a new account
        </a>
      </div>
);
}