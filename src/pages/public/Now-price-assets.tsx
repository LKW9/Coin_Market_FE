/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChartPie,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import ChattingWidget from "../../components/chat/Chat";
import TradingViewWidget from "../../api/TradingView-api";
import { GetCoinPrice } from "../../api/GetCoinPrice-api";
import { useDarkMode } from "../../context/Dark-mode";
import axios from "axios";
import { useEffect, useState } from "react";

const price = <GetCoinPrice />;

export default function NowPriceAssets() {
  const { currency } = useParams();
  const coinName: any = currency;
  const { darkMode } = useDarkMode();
  const [coinData, setCoinData] = useState(['a']);
  const [portfolioData, setPortfolioData] = useState(['a']);
  const selectedCoins = [coinName];
  const [isLogin, setIsLogin] = useState(false);

  const link = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
  };

  const coinAlert = (coinName: string) => {
    if(!isLogin){
      alert("로그인이 필요합니다.")
    }else{
      if (coinData.indexOf(coinName) != -1) {
        alert(`${coinName}이 즐겨찾기에 삭제되었습니다`);
      } else {
        alert(`${coinName}이 즐겨찾기에 추가되었습니다`);
      }
    }
    
  }

  const createCoin = (name: any) => {
    axios
      .post(
        "https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/favorites/checkcoin",
        { name },
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
        setCoinData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const portfolioAlert = async (coinName: string) => {
    if(!isLogin){
      alert("로그인이 필요합니다.")
    }else{
      if (portfolioData.indexOf(coinName) != -1) {
        deleteSelectedCoinsToServer(coinName);
        alert(`${coinName}이 포트폴리오에 삭제되었습니다`);
      } else {
        sendSelectedCoinsToServer();
        alert(`${coinName}이 포트폴리오에 추가되었습니다`);
      }
    }
  }


  const sendSelectedCoinsToServer = () => {
    const data = {
      selectedCoins: selectedCoins,
    };

    axios
      .post("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/portfolio/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((_response) => {
        axios.get("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/portfolio/mylist", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
          .then((response) => {
            setPortfolioData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteSelectedCoinsToServer = (coinName: string) => {
    axios.post("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/portfolio/delete", { coinName }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((response) => {
      setPortfolioData(response.data.data)
    })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    axios
      .get("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/favorites/checkcookie", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setIsLogin(response.data)
        if (response.data) {
          axios
            .get("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/favorites/viewcoin", {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            })
            .then((response) => {
              setCoinData(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }

        if (response.data) {
          axios.get("https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/portfolio/mylist", {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
            .then((response) => {
              setPortfolioData(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="mt-[60px] md:mt-[70px] overflow-x-hidden md:min-h-[970px]">
      <div className="w-screen overflow-x-hidden md:flex">
        <section className="md:w-[340px] p-[20px] border-b-2 border-solid border-grey-200 object-scale-down flex flex-col md:border-none">
          <div
            className={`w-[100%] p-[10px] md:mb-[20px] border-1 rounded-md ${darkMode ? "shadow-white" : "shadow-slate-500"
              }`}
          >
            <div className="">
              <div className="flex justify-between">
                <div>
                  <div>
                    <title className="block text-[15px]">
                      {coinName} / KRW
                    </title>
                  </div>
                  <div className="w-[200px]">
                    <span className="block w-[.8wh] text-[26px] font-extrabold">
                      ₩ {price}
                    </span>
                  </div>
                </div>

                <div className="flex mt-[20px]m">
                  <div className=" flex-1 text-center mr-[7px]">
                    <div className="cursor-pointer group">
                      <div className="mx-auto w-[25px] bg-slate-200	rounded-md overflow-hidden transition-all duration-500 group-hover:bg-[#efda7a] group-hover:opacity-100 opacity-70">
                        <button onClick={_e => {
                          createCoin(coinName);
                        }}>
                          <FontAwesomeIcon
                            icon={faStar}
                            size="sm"
                            className={`${coinData.indexOf(coinName) != -1
                              ? "text-yellow-400"
                              : "text-black"
                              }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div>
                      <div className="cursor-pointer group">
                        <div
                          className="mx-auto w-[25px] bg-slate-200	rounded-md overflow-hidden transition-all duration-500 group-hover:bg-[#efda7a] group-hover:opacity-100 opacity-70"
                          onClick={link}
                        >
                          <button>
                            <FontAwesomeIcon
                              icon={faShareNodes}
                              size="sm"
                              className="text-black"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="max-w-[400px]">
              <div className="cursor-pointer group ">
                <div className="w-[100%] h-[30px] my-[4%] rounded-lg overflow-hidden">
                  <button
                    className="bg-slate-200 w-[100%] h-[100%] transition-opacity duration-500 group-hover:opacity-100 opacity-60"
                    onClick={() => {
                      createCoin(coinName);
                      coinAlert(coinName);
                    }}
                  >
                    <div className="flex justify-between px-[6%]">
                      <div>
                        <span>
                          <FontAwesomeIcon
                            icon={faStar}
                            size="sm"
                            className={`${coinData.indexOf(coinName) != -1
                              ? "text-yellow-400"
                              : "text-black"
                              }`}
                          />
                        </span>
                        <label className="ml-[10px] text-black">
                          관심 목록 {`${coinData.indexOf(coinName) != -1 ? "삭제" : "추가"}`}
                        </label>
                      </div>
                      <div>+</div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="cursor-pointer group">
                <div className="w-[100%] h-[30px] my-[4%] rounded-lg overflow-hidden">
                  <button className="bg-slate-200 w-[100%] h-[100%] transition-opacity duration-500 group-hover:opacity-100 opacity-60"
                    onClick={() => {
                      portfolioAlert(coinName)
                    }}>
                    <div className="flex justify-between px-[6%]">
                      <div>
                        <span>
                          <FontAwesomeIcon
                            icon={faChartPie}
                            size="sm"
                            className="text-blue-400"
                          />
                        </span>
                        <label className="ml-[10px] text-black">
                          포트폴리오에서 {`${portfolioData.indexOf(coinName) != -1 ? "삭제" : "추가"}`}
                        </label>
                      </div>
                      <div>+</div>
                    </div>
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="hidden md:block">
            <ChattingWidget />
          </div>
        </section>

        <section className="flex-1 border-solid md:border-s-2 border-grey-200">
          <TradingViewWidget />
        </section>
        <section className="p-[20px] border-t-2 border-solid border-grey-200 md:hidden ">
          <ChattingWidget />
        </section>
      </div>
    </main>
  );
}
