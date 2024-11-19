/* eslint-disable @typescript-eslint/no-explicit-any */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDarkMode } from "../../context/Dark-mode";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletConnectionModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { darkMode } = useDarkMode();
  const [walletAddress, setWalletAddress] = useState("");

  const inWalletAddress = (e: any) => {
    setWalletAddress(e.target.value);
  };

  const onWalletAddress = () => {
    axios
      .post(
        "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/wallet",
        { walletAddress }
      )
      .then((response) => {
        console.log(
          "Wallet address successfully sent to the API.",
          response.data
        );
      })
      .catch((error) => {
        console.error("Error sending wallet address to the API", error);
      });
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center "
      style={{ backgroundColor: isOpen ? "rgba(0, 0, 0, 0.6)" : "transparent" }}
      onClick={handleBackdropClick}
    >
      <div
        className={`${
          darkMode
            ? "bg-black text-white shadow-md shadow-white"
            : "bg-white text-black"
        } flex flex-col justify-between p-4 rounded shadow-lg w-[50%] h-[18%]`}
      >
        <div className="text-right">
          <button
            className={`${
              darkMode ? "text-white" : "text-black"
            } text-[2vw]  hover:text-red-500`}
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <div>
          <p className="px-2 py-1">지갑 주소:</p>
          <div className="flex items-center justify-center text-center">
            <input
              className="flex-1 bg-gray-200 w-[80%] mr-2"
              onChange={inWalletAddress}
              type="text"
            />
            <span
              className={`bg-blue-500 hover:bg-blue-700 text-white mb-2 px-3 py-1 rounded mt-2 cursor-pointer shadow ${
                darkMode ? "shadow-white" : "shadow-black"
              }`}
              onClick={onWalletAddress}
            >
              Submit
            </span>
          </div>
          <span
            className="absolute cursor-pointer top-2 right-2"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faX} />
          </span>
        </div>
      </div>
    </div>
  ) : null;
};
