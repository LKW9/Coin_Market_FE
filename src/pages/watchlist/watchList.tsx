/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import {
  faCaretDown,
  faCaretUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowUpFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BithumbResponse, TradingChartApi } from "../../api/TradingChart-api";
import { useDarkMode } from "../../context/Dark-mode";
import axios from "axios";

export const WatchList: React.FC = () => {
  const [responseData, setResponseData] = useState<BithumbResponse | null>(
    null
  );

  const { darkMode } = useDarkMode();
  const [coinData, setCoinData] = useState(["a"]);
  const [searchTerm, _setSearchTerm] = useState<string>("");

  const link = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
  };

  const createCoin = (name: string) => {
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onDataLoaded = (data: BithumbResponse) => {
    setResponseData(data);
  };

  const filterCoins = (data: BithumbResponse | null, searchTerm: string) => {
    if (!data) return [];
    if (!searchTerm) return Object.keys(data.data);

    return Object.keys(data.data).filter((key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredCoins = filterCoins(responseData, searchTerm);

  return (
    <main className="mt-[130px] md:mt-[155px] overflow-x-hidden md:min-h-[1100px]">
      <TradingChartApi onDataLoaded={onDataLoaded} />
      <div className="flex justify-center ">
        <div className="w-full md:w-[80%] h-[100%]">
          <div className="pt-[3%]">
            <div
              className={`flex md:block items-center justify-center md:justify-start`}
            >
              <div className="md:flex">
                <p className="cursor-default bg-blue-600 rounded px-1 text-white text-[1vw] mx-1">
                  Main
                </p>
              </div>
              <p className="cursor-default text-[3vw] md:text-[2vw] pr-2 font-bold ">
                My First Coin Watchlist
              </p>
            </div>
            <div className="flex h-[100px]"></div>
          </div>
          <div>
            <div className="flex justify-end py-4">
              <div className="text-[1vw] h-[25px]">
                <button
                  className={`${
                    darkMode ? "bg-gray-500" : "bg-gray-200"
                  } h-[100%] rounded px-2 mr-2`}
                  onClick={link}
                >
                  <FontAwesomeIcon
                    className="pr-1"
                    icon={faArrowUpFromBracket}
                  />
                  공유
                </button>
              </div>
            </div>
            <div
              className={`h-[350px] ${
                coinData.length >= 10 ? "overflow-y-scroll" : ""
              }`}
            >
              <table className="w-full table-fixed ">
                <thead
                  className={`h-[40px] ${
                    darkMode ? "text-white bg-gray-500" : "bg-gray-100"
                  } sticky top-0` }style={{ zIndex: 1 }}
                >
                  <tr className="text-[2vh] cursor-default">
                    <th className="hidden md:flex-1 md:table-cell md:w-[10%]">
                      즐겨찾기
                    </th>
                    <th className="flex-1">가상코인</th>
                    <th className="flex-1">현재가</th>
                    <th className="flex-1">거래량</th>
                    <th className="hidden md:flex-1 md:table-cell">거래금액</th>
                    <th className="hidden md:flex-1 md:table-cell">
                      전일종가(24h)
                    </th>
                    <th className="flex-1 md:w-[10%]">변동률(24h)</th>
                  </tr>
                </thead>
                <tbody className="border-b-2 border-white drop-shadow-2xl">
                  {filteredCoins.map((currency: any) => {
                    coinData.indexOf(currency) == -1
                      ? (currency = null)
                      : currency;
                    const item = responseData?.data[currency];
                    if (!item) return null;
                    if (currency === "date") return;

                    const fluctuationClass =
                      item.fluctate_rate_24H > 0
                        ? "text-red-500 "
                        : "text-blue-500";

                    const nowPriceClass =
                      item.opening_price > item.prev_closing_price
                        ? "text-red-500 "
                        : item.opening_price === item.prev_closing_price
                        ? ""
                        : "text-blue-500";

                    return (
                      <tr
                        key={currency}
                        className={`${
                          darkMode ? "border-t-2 border-white" : ""
                        } shadow text-center hover:bg-[#efda7a] md:cursor-pointer md:hover:bg-[#efda7a] md:shadow`}
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          if (target.parentElement?.id !== "favorite") {
                            window.location.href = `/trading-view/${currency}`;
                          }
                        }}
                      >
                        <td
                          className="hidden md:flex-1 md:py-2 md:table-cell md:border-r md:border-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            createCoin(currency);
                          }}
                        >
                          <button
                            id="favorite"
                            className="w-full h-full hover:scale-150"
                          >
                            <FontAwesomeIcon
                              icon={faStar}
                              className={`w-[100%] text-yellow-400`}
                            />
                          </button>
                        </td>
                        <td className="flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200">
                          {currency}
                        </td>
                        <td
                          className={`flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 ${nowPriceClass}`}
                        >
                          ₩{Number(item.opening_price).toLocaleString()}
                        </td>
                        <td
                          className={`flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell `}
                        >
                          {Math.floor(item.units_traded).toLocaleString()}
                        </td>
                        <td
                          className={`hidden flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell`}
                        >
                          ₩{Math.floor(item.acc_trade_value).toLocaleString()}
                        </td>
                        <td className="hidden md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell">
                          ₩{Number(item.prev_closing_price).toLocaleString()}
                        </td>
                        <td
                          className={`flex-1 py-2 md:flex-1 md:py-2 ${fluctuationClass}`}
                        >
                          <FontAwesomeIcon
                            icon={
                              item.fluctate_rate_24H >= 0
                                ? faCaretUp
                                : faCaretDown
                            }
                            size="sm"
                            style={{
                              paddingRight: "5px",
                            }}
                          />
                          {Math.abs(item.fluctate_rate_24H).toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
