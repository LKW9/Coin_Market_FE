import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useEffect, useState } from "react";

const LogoutBtn = () => {
  const [emailFront, setEmailFront] = useState("");
  const [emailBack, setEmailBack] = useState("");
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    axios
      .get("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/favorites/checkcookie", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          axios
            .post("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/user/userprofile")
            .then((response) => {
              setEmailFront(response.data.decodedToken.user.email.split("@")[0]);
              setEmailBack(response.data.decodedToken.user.email.split("@")[1]);
              setPhoto(response.data.decodedToken.user.photo);
            })
            .catch(() => { });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const redirectAfterLogoutPath = () => {
    window.location.href = "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/auth/logout";
  };
  return (
    <div className="flex-1 flex flex-col sm:flex-row items-center sm:justify-end md:justify-center h-full p-[5px] min-w-[170px]">
      <div className="w-full sm:w-[140px] md:flex-1 flex items-center">
        <img className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:h-[50px] md:w-[50px] rounded-lg" src={photo} alt="userImage" />
        <div className=' flex-1 text-start my-auto pl-[10px]'>
          <span className="text-[5px] md:text-[13px] pb-1">{emailFront}</span>
          <span className="sm:hidden text-[5px] md:text-[13px] pb-1">@{emailBack}</span>
          <p className="hidden sm:block text-[5px] md:text-[13px] pb-1">@{emailBack}</p>
        </div>
      </div>
      <div className='rounded-md shadow-sm w-full sm:w-[40px] sm:mx-[10px] md:w-[110px] sm:h-[50px] flex items-center justify-center mb-[5px] cursor-grab hover:bg-slate-600 hover:text-white' onClick={redirectAfterLogoutPath}>
        <p className="w-full h-[20px] text-center shadow-sm rounded-md text-[10px] md:text-[15px] flex items-center justify-center" ><FontAwesomeIcon
          icon={faRightFromBracket}
          style={{
            paddingRight: "7px",
            fontSize:"20px"
          }}
        /></p>
      </div>
    </div>
  );
};

export default LogoutBtn;
