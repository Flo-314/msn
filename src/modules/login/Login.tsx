"use client";

import {useState} from "react";
import Window from "../../lib/common/Window";
import Image from "next/image";
import {login, signup} from "@/app/actions";
import {useUser} from "@/lib/hooks/userContext";
import {User} from "@/types/types";

export default function Login() {
  return (
    <div>
      <Window childrenName="MSN">
        <div className="mx-auto max-w-md p-2  rounded-sm bg-backforth-gradient ">
          <LoginTop></LoginTop>
          <div className="flex flex-col justify-center items-center">
            <div className="border-[1px] border-gray-500 rounded-lg bg-[#FEFEFE]">
              <Image alt="msnLogin" src={"/msnpersonlogo.png"} width={"120"} height={"120"}></Image>
            </div>

            <LoginForm></LoginForm>
          </div>

          <LoginFooter></LoginFooter>
        </div>
      </Window>
    </div>
  );
}

function LoginTop() {
  return (
    <div className="flex gap-3 items-center mb-7">
      <Image src={"/MSN_logo.webp"} width={35} height={12} alt="msn logo"></Image>
      <p className="bold text-[10px]">Messenger</p>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("online");
  const [isLogging, setIsLogging] = useState(false);
  const {setUser} = useUser();

  const handleSubmit = () => {
    setIsLogging(!isLogging);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="mb-1">
        <label htmlFor="email" className="text-xs    text-darkLabel">
          Cuenta de correo electrónico:
        </label>
        <div className="flex justify-center items-center gap-0.5">
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-1 py-0.5 text-sm   bg-none border border-inputGray"
          />
          <button className="text-center text-sm p-0.5  border border-inputGray">▼</button>
        </div>
      </div>

      <div className="">
        <label htmlFor="password" className="text-xs    text-darkLabel">
          Password:
        </label>
        <input
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full  border border-inputGray px-1 py-1 text-sm "
        />
      </div>

      <div className="flex items-center text-darkLabel text-sm">
        <label htmlFor="status" className=" ">
          Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className=" bg-transparent "
        >
          <option value="online">Online</option>
          <option value="busy">Busy</option>
          <option value="away">Away</option>
          <option value="offline">Appear Offline</option>
        </select>
      </div>

      {isLogging ? (
        <div className="max-w-16 my-3.5 mx-auto">
          <img src="/login.gif" />
        </div>
      ) : (
        <div className=" text-sm my-3.5">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="h-4 w-4 rounded border-[#7B9EC7]" />
            <label htmlFor="remember" className="text-[#000F35]">
              Remember Me
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember-password"
              className="h-4 w-4 rounded border-[#7B9EC7]"
            />
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
      )}

      <div className="flex">
        <button
          formAction={signup}
          type="submit"
          className="rounded border border-[#7B9EC7] bg-gradient-to-b from-[#FEFEFE] to-[#E2E2E2] px-8 py-1 text-sm text-[#000F35] hover:from-[#E2E2E2] hover:to-[#FEFEFE] active:from-[#E2E2E2] active:to-[#E2E2E2]"
        >
          {isLogging ? "Cancelar" : "signup"}
        </button>

        <button
          formAction={async (formdata) => {
            const log = await login(formdata);

            if (log?.data?.user) setUser(log.data.user as User | null);
          }}
          type="submit"
          className="rounded border  border-[#7B9EC7] bg-gradient-to-b from-[#FEFEFE] to-[#E2E2E2] px-8 py-1 text-sm text-[#000F35] hover:from-[#E2E2E2] hover:to-[#FEFEFE] active:from-[#E2E2E2] active:to-[#E2E2E2]"
        >
          {isLogging ? "CANCELAR EL login" : "login"}
        </button>
      </div>
    </form>
  );
}

function LoginFooter() {
  return (
    <div className="mt-6 flex justify-between text-sm">
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
