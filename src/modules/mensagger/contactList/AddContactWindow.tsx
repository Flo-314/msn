"use client";
import {useContacts} from "@/lib/hooks/contactsContext";
import Image from "next/image";
import {useState} from "react";

function AddContactWindow({closeWindow}: {closeWindow: () => void}) {
  const [email, setEmail] = useState<string>("");
  const {addContact} = useContacts();

  return (
    <div className="flex flex-col bg-gray-light p-4 text-black">
      <div className="self-end ">
        <Image
          src="/png/mensaggerWindow/msnPropaganda.jpg"
          width={237}
          height={50}
          alt="msn propaganda"
        ></Image>
      </div>
      <strong className=" text-nowrap mb-6 mr-24">
        Please type your contacts complete e-mail adress{" "}
      </strong>
      <div>
        <input
          className="w-full max-w-64 h-6 border-input border"
          type="text"
          value={email}
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="flex text-xxs  mt-4 ml-10 gap-6 mb-40">
          <p>Example:</p>
          <div>
            <p>name_123@hotmail.com</p>
            <p>example@msn.com</p>
            <p>myname@passport.com</p>
          </div>
        </div>

        <hr className="bg-input" />

        <div className="flex justify-end items-center gap-1 mt-4">
          <button
            className="bg-gray p-1 border-input border "
            onClick={async () => {
              const isContactAdded = await addContact(email);

              if (isContactAdded) {
                closeWindow();
              }
            }}
          >
            Add Contact
          </button>
          <button className="bg-gray p-1 border-input border  px-4 " onClick={closeWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddContactWindow;
