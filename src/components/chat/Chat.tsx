/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { useDarkMode } from "../../context/Dark-mode";
import EmojiBtn from "../button/EmojiBtn";
import axios from "axios";
import useTime from "../../hooks/TimeStamp";
import "./Chat.css";

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const { darkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const timeInfo = useTime();

  useEffect(() => {
    axios
      .get(
        "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/favorites/checkcookie",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data) {
          axios
            .post(
              "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/user/userprofile"
            )
            .then((response) => {
              setEmail(response.data.decodedToken.user.email);
              setPhoto(response.data.decodedToken.user.photo);
              setIsLoggedIn(true);
            })
            .catch((error) => {
              console.error("chatError fetching user profile:", error);
              setIsLoggedIn(false);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const newSocket: Socket = io(
      "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app",
      {
        transports: ["websocket"],
      }
    );
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("join room", "coin");
    });

    newSocket.on("new message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      if (isLoggedIn) {
        socket.emit("new message", { photo, email, message, room: "coin" });
        setMessage("");
      } else {
        alert("로그인이 필요합니다.");
        setMessage("");
      }
    }
  };

  const isEmojiSelect = (emoji: any) => {
    setMessage((prevText) => prevText + emoji);
  };

  const isKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.repeat) {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section
      className={`relative flex flex-col my-[0] mx-auto w-[100%] h-[840px] group border-1 border-solid z-0 border-slate-300 rounded-lg shadow-sm ${
        darkMode ? "shadow-white" : "shadow-slate-500"
      }`}
    >
      <div
        className="bg-slate-60 h-[90%] bottom-0 overflow-scroll overflow-x-hidden mb-[5%]"
        id="chat-container"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-start w-[100%] min-h-[50px] border-b-2 border-solid  border-slate-300 odd:bg-slate-200 odd:text-black"
          >
            <div className="shadow-sm	shadow-slate-500 border-2  rounded-lg overflow-hidden w-[50px] h-[50px] mx-[10px] mt-[20px]">
              <img
                className="w-full h-full bg-white"
                src={msg.photo}
                alt="profile"
              />
            </div>
            <div className="flex flex-col flex-1 ">
              <div className="mt-[23px]">
                <span>{msg.email}</span>
                <p className="">{`${timeInfo.hours}시 ${timeInfo.minutes}분`}</p>
              </div>
              <div className="my-[20px] w-[200px] wrap-text ">
                <span>{msg.message}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 h-[60px] group cursor-pointer flex-1 flex items-center justify-center w-full rounded-lg border-2 border-solid border-grey-200 transition-opacity duration-500 group-hover:border-blue-300 group-focus-within:border-blue-300 opacity-100">
        <input
          placeholder="할 얘기가 있으신가요?"
          className="mx-[2%] w-[85%] h-[90%] text-lg placeholder:text-slate-300 outline-none bg-transparent"
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={isKeyDown}
        />
        <div className="z-410 flex-1 mx-[1%] h-[90%]">
          <EmojiBtn onEmojiSelect={isEmojiSelect} />
        </div>
      </div>
    </section>
  );
};

export default Chat;
