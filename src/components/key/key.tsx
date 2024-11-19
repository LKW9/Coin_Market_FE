import { useState, SetStateAction } from "react";
import axios from "axios";

interface KeyProps {
  setIsKeyInDB: React.Dispatch<React.SetStateAction<boolean>>;
}

const Key:React.FC<KeyProps> = ({setIsKeyInDB}) => {
  const [connectKey, setConnectKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const inConnectKey = (e: { target: { value: SetStateAction<string> } }) => {
    setConnectKey(e.target.value);
  };

  const inSecretKey = (e: { target: { value: SetStateAction<string> } }) => {
    setSecretKey(e.target.value);
  };  

  const onKeyBtn = () => {
    setIsKeyInDB(true);
    axios
      .post(
        "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/portfolio/apikey",
        { connectKey, secretKey },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        const receivedToken = response.data.token;
        localStorage.setItem("token", receivedToken);
      })
      .catch((error) => {
        console.error("API 키 전송 중 오류 발생", error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center  h-[80%] px-3">
      <div className="w-[500px]">
        <div>
          <p>connect key</p>
          <input className="bg-gray-200 w-full h-[60px]" onChange={inConnectKey} type="text" />
        </div>
        <div>
          <p>secret key</p>
          <input className="bg-gray-200 w-full h-[60px]" onChange={inSecretKey} type="text" />
        </div>
      </div>
      <button
        className="rounded bg-blue-500 hover:bg-blue-700 text-white w-[500px] h-[60px] mt-[20px] mx-2 px-4"
        onClick={onKeyBtn}
      >
        전송
      </button>
    </div>
  );
}

export default Key