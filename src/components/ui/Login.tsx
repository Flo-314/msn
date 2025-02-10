"use client";

import { useState } from "react";
import Window from "../common/Window";
import Image from "next/image";

export default function Login() {
  return (
    <Window childrenName="MSN">
      <div
        style={{
          background:
            "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(208, 221, 240, 1) 50%, rgba(255, 255, 255, 1) 100%)",
        }}
        className="mx-auto max-w-md p-2  rounded-sm "
      >
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
  return (
    <div className="flex gap-3 items-center mb-7">
      <Image
        src={"/MSN_logo.webp"}
        width={35}
        height={12}
        alt="msn logo"
      ></Image>
      <p className="bold text-[10px]">Messenger</p>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("online");
  const [isLogging, setIsLogging] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-1 py-0.5 text-sm   bg-none border border-inputGray"
          />
          <button className="text-center text-sm p-0.5  border border-inputGray">
            ▼
          </button>
        </div>
      </div>

      <div className="">
        <label htmlFor="password" className="text-xs    text-darkLabel">
          Password:
        </label>
        <input
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
          {" "}
          <img src="/login.gif"></img>{" "}
        </div>
      ) : (
        <div className=" text-sm my-3.5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-[#7B9EC7]"
            />
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
            <input
              type="checkbox"
              id="auto-login"
              className="h-4 w-4 rounded border-[#7B9EC7]"
            />
            <label htmlFor="auto-login" className="text-[#000F35]">
              Sign me in automatically
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          className="rounded border border-[#7B9EC7] bg-gradient-to-b from-[#FEFEFE] to-[#E2E2E2] px-8 py-1 text-sm text-[#000F35] hover:from-[#E2E2E2] hover:to-[#FEFEFE] active:from-[#E2E2E2] active:to-[#E2E2E2]"
        >
          {isLogging ? "Cancelar" : "Iniciar sesión"}
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
