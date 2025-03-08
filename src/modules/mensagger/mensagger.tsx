import Window from "@/lib/common/Window";
import UserHeader from "./userHeader/UserHeader";
import AddContactButton from "./contactList/addContactButton";
import ContactList from "./contactList/contactList";
import Ad from "./Ad";
import {User} from "@/types/types";
import Image from "next/image";
import {useChatNotification, useUserStatusSubscription} from "@/lib/hooks/notifications";
import {Slide, ToastContainer, toast} from "react-toastify";
import NotificationToast from "@/lib/common/toast";
import {useCallback} from "react";

function Mensagger({user}: {user: User}) {
  const notificationToast = useCallback(
    (username: string, isMessage: boolean, message?: string) => {
      toast(
        ({closeToast}) => (
          <NotificationToast
            isMessage={isMessage}
            message={message}
            username={username}
            closeToast={closeToast}
          />
        ),
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          className: "msn-toast",
          transition: Slide,
        },
      );
    },
    [],
  );

  useChatNotification(user, notificationToast);

  useUserStatusSubscription(user, notificationToast);

  return (
    <Window windowHeaderName="MSN Messenger">
      <ToastContainer />
      <div className="bg-gray-light min-w-64 w-[500px] ">
        <UserHeader></UserHeader>

        <div className="grid grid-cols-[7%_93%]   ">
          {/* aside separator */}
          <div className="bg-[#ecf0f5]">
            <Image
              src="/png/mensaggerWindow/contactAsideShape.png"
              width={35}
              height={61}
              alt=""
              className=""
            ></Image>
          </div>

          <div className=" border-black  bg-msnLightGray">
            <AddContactButton></AddContactButton>
            <div className="">
              <ContactList></ContactList>
              <Ad></Ad>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

export default Mensagger;
