"use client";

import {useState} from "react";
import Window from "../../lib/common/Window";
import Image from "next/image";
import {signIn, signup} from "@/lib/supabase/auth";
import TriangleIcon from "@/lib/common/TriangleIcon";
import StatusDropDown from "../mensagger/userHeader/profileStatusDropDown/StatusDropDown";
import {UserStatus} from "@/types/types";

export default function Login() {
  return (
    <div>
      <Window windowHeaderName="MSN">
        <div className="mx-auto max-w-md p-2  rounded-sm bg-backforth-gradient px-4 w-96">
          <div className="flex flex-col justify-center items-center mt-6  text-xs">
            <div className="  mb-4  ">
              <Image
                className="rounded-xl border-msnDarkGray border "
                alt="msnLogin"
                src={"/png/msnPersonLogo.png"}
                width={"120"}
                height={"120"}
              ></Image>
            </div>

            <LoginForm></LoginForm>
            <LoginFooter></LoginFooter>
          </div>
        </div>
      </Window>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<UserStatus>(UserStatus.Online);
  const [isAutoLogin, setIsAutoLogin] = useState<boolean>(false);
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsLogging(!isLogging);
  };

  return (
    <form onSubmit={handleSubmit} className="text-darkLabel text-xs flex flex-col  justify-center">
      <div className="mb-2">
        <label htmlFor="email" className="text-xs    text-darkLabel">
          Cuenta de correo electrónico:
        </label>
        <div className="flex justify-center  gap-0.5 h-6">
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-1    border border-blueToast-200 "
          />
          <button
            type="button"
            className="text-center 5    border px-1 bg-white border-blueToast-200"
          >
            <TriangleIcon></TriangleIcon>
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="password" className=" ">
          Password:
        </label>
        <input
          autoComplete="password"
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full  px-1   h-6 border border-blueToast-200  "
        />
      </div>
      <div className="flex gap-2 my-2">
        <label htmlFor="status">Status:</label>
        <div className="relative">
          <span
            onClick={() => {
              setIsProfileDropdownOpen(true);
            }}
            className={`text-xs capitalize  px-1.5  py-0.5 border cursor-pointer hover:border-blue-dark hover:bg-gray-light ${isProfileDropdownOpen ? "bg-gray-white border-blue-dark" : "border-transparent bg-transparent"}`}
          >
            {status}
          </span>
          {isProfileDropdownOpen && (
            <StatusDropDown
              isLogin={true}
              onClose={() => {
                setIsProfileDropdownOpen(false);
              }}
              onUpdateUserStatus={(status) => {
                setStatus(status);
                setIsProfileDropdownOpen(false);
                localStorage.setItem("status", status);
              }}
            />
          )}
        </div>
      </div>
      <div className="flex h-20">
        {isLogging ? (
          <div className="mx-auto ">
            <Image height={75} width={69} src="/gif/login/login.GIF" alt="login loadin" />
            <p>Signing in...</p>
          </div>
        ) : (
          <div className="flex items-baseline  gap-0.5">
            <input
              name="auto-login"
              type="checkbox"
              id="auto-login"
              checked={isAutoLogin}
              onChange={() => {
                localStorage.setItem("isAutoLogin", !isAutoLogin ? "true" : "false");
                setIsAutoLogin(!isAutoLogin);
              }}
              className=" rounded-none border-blueToast-200"
            />
            <label htmlFor="auto-login" className="text-darkLabel">
              Sign me in automatically
            </label>
          </div>
        )}
      </div>
      <div className="flex  justify-center">
        <button
          formAction={async (formData) => {
            const request = await signIn(formData);

            if (request !== true) {
              setIsLogging(false);
            }
          }}
          type="submit"
          className=" border border-winBlue px-3 py-1 font-semibold    shadow-[inset_0_0_1px_1px_#F0A000,2px_2px_3px_rgba(0,0,0,0.4),4px_4px_5px_rgba(0,0,0,0.3)] "
          style={{boxShadow: "inset 0 0 1px 1px #F0A000, 2px 2px 3px rgba(0, 0, 0, 0.4)"}}
        >
          {isLogging ? "Cancel" : "Sign In"}
        </button>
      </div>
    </form>
  );
}

function LoginFooter() {
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);

  return (
    <div className="mt-36 flex justify-between text-xs text-darkLabel w-full ">
      <div className="space-y-1">
        <a href="#" className="block ">
          Forgot your password?
        </a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="block ">
          Service Status
        </a>
      </div>
      <a
        href="#"
        onClick={() => {
          setIsCreatingAccount(true);
        }}
      >
        Get a new account
      </a>

      {isCreatingAccount && (
        <Window windowHeaderName="¡Get a new account!" onClose={() => setIsCreatingAccount(false)}>
          <div className="bg-gray-light px-6 py-4 flex flex-col">
            <p>Please enter your email account information below</p>
            <form
              onSubmit={async () => {}}
              className="text-darkLabel text-xs flex flex-col justify-center mt-4"
            >
              <div className="mb-2">
                <label htmlFor="new-email" className="text-xs text-darkLabel">
                  Email:
                </label>
                <input
                  id="new-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full px-1 border border-blueToast-200"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="new-password" className="text-xs text-darkLabel">
                  Password:
                </label>
                <input
                  id="new-password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  className="w-full px-1 border border-blueToast-200"
                />
              </div>
              <div className="flex justify-center">
                <button
                  formAction={async (formData) => {
                    const request = await signup(formData);

                    if (request === true) {
                      setIsCreatingAccount(false);
                    }
                  }}
                  type="submit"
                  className="border border-winBlue px-3 py-1 font-semibold shadow-[inset_0_0_1px_1px_#F0A000,2px_2px_3px_rgba(0,0,0,0.4),4px_4px_5px_rgba(0,0,0,0.3)]"
                  style={{boxShadow: "inset 0 0 1px 1px #F0A000, 2px 2px 3px rgba(0, 0, 0, 0.4)"}}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </Window>
      )}
    </div>
  );
}
