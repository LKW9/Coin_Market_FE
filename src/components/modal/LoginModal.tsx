import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from "../../context/Dark-mode";
import { LoginBtnComponent } from "../continueWithLoginBtn/continueWithLoginBtn";

interface LoginModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const getWindowHeight = () => {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
};

export const LoginModal: React.FC<LoginModalProps> = ({
  isModalOpen,
  onClose,
}) => {
  const { darkMode } = useDarkMode();
  const modalStyle = {
    backgroundColor: isModalOpen ? "rgba(0, 0, 0, 0.8)" : "transparent",
    display: isModalOpen ? "block" : "none",
  };
  const [winHeight, setWinHeight] = useState(getWindowHeight);

  const handleCloseClick = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const redirectToNaverAutoPath = () => {
    window.location.href =
      "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/auth/naver/callback";
  };

  const redirectToKakaoAutoPath = () => {
    window.location.href =
      "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/auth/kakao/callback";
  };

  const redirectToGoogleAutoPath = () => {
    window.location.href =
      "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/auth/google/callback";
  };

  useEffect(() => {
    const handleResize = () => {
      setWinHeight(getWindowHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="fixed w-full h-full transition-opacity duration-100 bg-black opacity-100 modal z-400"
      style={modalStyle}
      onClick={handleBackdropClick}
    >
      <div
        className="modal-content flex flex-col  justify-between bg-slate-200 border-1 border-slate-300 overflow-hidden shadow-lg shadow-slate-100  rounded-lg opacity-100 mx-auto w-[300px] h-[500px]"
        style={{ transform: `translateY(${winHeight / 2 - 250}px)` }}
      >
        <section className="loginSection flex-1 p-[10px] flex flex-col ">
          <button
            className={`closeBtn shadow-lg border-0 border-solid rounded-sm shadow-slate-200 w-[20px] h-[25px] ml-auto mb-[10px] transition-all duration-500 hover:bg-[#efda7a] ${
              darkMode ? "bg-[#0c0e13]" : "bg-transparent"
            }`}
            onClick={handleCloseClick}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <div
            className={`${
              darkMode ? "bg-[#22243b] md:bg-[#22243b]" : ""
            } upBox bg-white flex justify-between items-center flex-col border-3 border-slate-300 overflow-hidden shadow-md shadow-slate-400 rounded-lg flex-1 w-full h-full p-[10px] py-[30px]`}
          >
            <div className="loginTitle bg-400">
              <h1 className="text-lg font-bold">로그인</h1>
            </div>
            <div className="w-full">
              <LoginBtnComponent
                name="naver"
                redirectToAutoPath={redirectToNaverAutoPath}
              />
              <LoginBtnComponent
                name="kakao"
                redirectToAutoPath={redirectToKakaoAutoPath}
              />
              <LoginBtnComponent
                name="google"
                redirectToAutoPath={redirectToGoogleAutoPath}
              />
            </div>
            <div className="textCotainer">
              <p className="text-xs text-center">
                By proceeding you agree to CoinView's{" "}
                <a
                  href="/terms"
                  className="text-blue-500 underline TermsOfUse hover:text-red-400"
                >
                  <br />
                  Terms of Use
                </a>{" "}
                &{" "}
                <a
                  href="/privacy"
                  className="text-blue-500 underline PrivacyPolicy hover:text-red-400"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
