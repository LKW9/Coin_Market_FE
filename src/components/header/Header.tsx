/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faMoon,
  faSearch,
  faStarHalfAlt,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { ScrollToTop } from "../../api/ScrollToTop-api";
import { useDarkMode } from "../../context/Dark-mode";
import { LoginModal } from "../modal/LoginModal";
import LoginBtn from "../button/LoginBtn";
import { useAuth } from "../../context/IsLogined";
import { BithumbResponse } from "../../api/TradingChart-api";
import axios from "axios";
import LogoutBtn from "../button/LogoutBtn";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [responseData, setResponseData] = useState<BithumbResponse | null>(
    null
  );
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isLogin, setLogin] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { accessToken } = useAuth();

  const filterCoins = (data: BithumbResponse | null, searchTerm: string) => {
    if (!data) return [];
    if (!searchTerm) return Object.keys(data.data);

    return Object.keys(data.data).filter((key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredCoins = filterCoins(responseData, searchTerm);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleSearch = (e: any) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const coin = searchTerm.toUpperCase();

      const hasResults = filteredCoins.includes(coin);

      if (hasResults) {
        window.location.href = `/search/${coin}`;
      } else {
        window.location.href = "/nonecoin";
      }
    }
  };

  const sendMessage = () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
    }
  };

  useEffect(() => {
    axios
      .get("https://api.bithumb.com/public/ticker/ALL_KRW", {})
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중에 오류가 발생했습니다.", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/favorites/checkcookie", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setLogin(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <header
      className={`${
        darkMode ? "dark" : "light"
      } fixed top-0 w-full z-40 md:top-0 h-[60px] md:h-[70px] shadow-sm shadow-slate-200 opacity-100`}
    >
      <LoginModal isModalOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <div className="flex items-center justify-between h-[100%] overflow-hidden md:mx-[20px]">
        <a
          href="/"
          className="min-w-[100px] sm:w-[130px] md:w-[150px] max-w-[40%]"
        >
          <img
            src={`${darkMode ? "/header-dark.png" : "/header.png"}`}
            alt={`${darkMode ? "Header-dark" : "Header"}`}
          />
        </a>

        <div className="flex-1 w-full h-[100%] flex">
          <div className="group hidden flex-1 md:flex items-end justify-end mx-[20px] mr-0 flex-wrap">
            <div className="flex flex-col items-center h-full">
              <div className="items-center justify-center flex-1 hidden w-full md:flex">
                <a
                  href={isLogin ? "/favorites" : ""}
                  onClick={sendMessage}
                  className="mr-[20px] md:cursor-pointer md:hover:underline md:hover:text-[#efda7a] w-[120px] text-center"
                >
                  <FontAwesomeIcon
                    icon={faStarHalfAlt}
                    style={{
                      color: "#efda7a",
                      paddingRight: "7px",
                    }}
                  />
                  <span className="text-[14px]">즐겨찾기</span>
                </a>
                <a
                  href={isLogin ? "/portfolio" : ""}
                  onClick={sendMessage}
                  className="md:cursor-pointer md:hover:underline md:hover:text-[#38bdf8] w-[120px] text-center"
                >
                  <FontAwesomeIcon
                    icon={faChartPie}
                    style={{
                      color: "#38bdf8",
                      paddingRight: "7px",
                    }}
                  />
                  <span className="text-[14px]">포트폴리오</span>
                </a>
              </div>
              <div className=" w-[230px] hidden md:flex items-center rounded-lg shadow-sm shadow-slate-200 group-focus-within:shadow-blue-400 hover:shadow-blue-400 mb-[5px]">
                <label htmlFor="search" className="ml-[10px]">
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ paddingRight: "7px" }}
                  />
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="코인입력"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearch}
                  value={searchTerm}
                  className="flex-1 h-[30px] focus:outline-none bg-transparent md:focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 md:flex-none flex h-full md:px-[10px]">
            <div className="flex justify-center flex-1 itmes-center">
              {accessToken ? (
                <LogoutBtn />
              ) : (
                <LoginBtn openLoginModal={openLoginModal} />
              )}
            </div>
            <button
              className="md:text-xl md:cursor-pointer flex md:hover:text-[#efda7a] text-end"
              onClick={toggleDarkMode}
            >
              {!darkMode && (
                <FontAwesomeIcon
                  icon={faMoon}
                  className="text-[20px] m-[10px]"
                  style={{
                    paddingRight: "7px",
                  }}
                />
              )}
              {darkMode && (
                <FontAwesomeIcon
                  icon={faSun}
                  className="text-[20px] m-[10px]"
                  style={{
                    paddingRight: "7px",
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className=" w-full flex md:hidden bg-white items-center shadow-sm shadow-slate-200 group-focus-within:shadow-blue-400 hover:shadow-blue-400 mb-[5px]">
        <label htmlFor="smallSearch" className="ml-[10px]">
          <FontAwesomeIcon icon={faSearch} style={{ paddingRight: "7px" }} />
        </label>
        <input
          type="text"
          id="smallSearch"
          placeholder="코인입력"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearch}
          value={searchTerm}
          className="flex-1 h-[30px] focus:outline-none bg-transparent md:focus:outline-none"
        />
      </div>
      <ScrollToTop />
    </header>
  );
}
