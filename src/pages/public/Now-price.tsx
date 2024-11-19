/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { BithumbResponse, TradingChartApi } from "../../api/TradingChart-api";
import { ScrollToTop } from "../../api/ScrollToTop-api";
import { useDarkMode } from "../../context/Dark-mode";
import ChattingWidget from "../../components/chat/Chat";
import RealTimeTop5Coins from "../../api/GetTop5Coin-api";
import axios from "axios";


export const NowPrice: React.FC = () => {
  const [responseData, setResponseData] = useState<BithumbResponse | null>(
    null
  );
  const [searchTerm, _setSearchTerm] = useState<string>("");
  const { darkMode } = useDarkMode();
  const [coinData, setCoinData] = useState(['a']);

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

  const createCoin = (name: string) => {
    axios.post('https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/favorites/checkcoin', { name }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then((response) => {
        const receivedToken = response.data.token;
        localStorage.setItem("token", receivedToken);
        setCoinData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    axios.get('https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/favorites/checkcookie', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    }).then((response) => {
      if (response.data) {
        axios.get('https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app/favorites/viewcoin', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
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
  },[]);

  const filteredCoins = filterCoins(responseData, searchTerm);

  return (
    <main className="mt-[90px] md:mt-[70px] overflow-x-hidden h-[1100px] md:min-h-[1100px] lg:flex justify-between">
      <section className="md:w-[300px] hidden lg:block p-[20px] pr-0 flex-col items-center ">
        <div className="flex flex-col h-full">
          <div className="w-full h-[200px]">
            <div className="w-full text-center">
              <RealTimeTop5Coins />
            </div>
          </div>
          <div className="w-full">
            <ChattingWidget />
          </div>
        </div>
      </section>
      <section className="flex-1 flex items-start justify-center p-[20px] h-full">
        <TradingChartApi onDataLoaded={onDataLoaded} />
        <div className="w-[100%] h-[98%] rounded-lg shadow-sm shadow-slate-400 overflow-x-auto">
          <table className="w-full ">
            <thead
              className="min-h-[400px] shadow-sm shadow-black bg-slate-300 md:border-gray-200 md:text-center sticky top-0"
              style={{ zIndex: 1 }}
            >
              <tr
                className={`${darkMode ? "text-black":"text-white"}  shadow-md md:shadow-md w-[100%] h-[30px]`}
              >
                <th className={`md:flex-1 md:py-[6px] md:table-cell w-[10%] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[17px]`}>
                  즐겨찾기
                </th>
                <th className="md:flex-1 md:py-[3px] w-[10%] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[17px]">
                  가상코인
                </th>
                <th className="md:flex-1 md:py-[3px] w-[15%] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[17px]">
                  현재가
                </th>
                <th className="md:flex-1 md:py-[3px] w-[15%] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[17px]">
                  거래량
                </th>
                <th className="hidden md:flex-1 md:py-[3px] md:table-cell w-[20%] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[17px]">
                  거래금액
                </th>
                <th className="hidden md:flex-1 md:py-[3px] md:table-cell w-[20%] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[17px]">
                  전일종가(24h)
                </th>
                <th className="md:flex-1 md:py-[3px] w-[20%] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[17px]">
                  변동률(24h)
                </th>
              </tr>
            </thead>
            <tbody className={`text-center md:text-center ${darkMode}`}>
              {filteredCoins.map((currency: any) => {
                const item = responseData?.data[currency];
                if (!item) return null;
                if (currency === "date") return;

                const fluctuationClass =
                  item.fluctate_rate_24H > 0
                    ? "text-red-500 "
                    : "text-blue-500";

                const nowPriceClass =
                  item.closing_price > item.prev_closing_price
                    ? "text-red-500 "
                    : item.closing_price === item.prev_closing_price
                      ? ""
                      : "text-blue-500";

                return (
                  <tr
                    key={currency}
                    className={`cursor-pointer relative shadow-md border-1 border-solid hover:border-slate-400 ${darkMode ? "hover:bg-yellow-600" : "hover:bg-[#ffe45c]"
                      }  hover:shadow-slate-400 transition-hover`}
                    style={{ position: "relative", cursor: "pointer" }}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.parentElement?.id !== "favorite") {
                        window.location.href = `/trading-view/${currency}`;
                      }
                    }}
                  >
                    <td
                      className="md:flex-1 md:table-cell md:border-r md:border-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        createCoin(currency)
                      }}
                    >
                      <button
                        id="favorite"
                        className="w-full h-full hover:scale-150"
                      >
                        <FontAwesomeIcon icon={faStar} className={`w-[100%] ${(coinData.indexOf(currency) != -1) ? "text-yellow-400" : "text-[#e1e1e1]"}`} />
                      </button>
                    </td>
                    <td className="flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 text-[4px] sm:text-[12px] md:text-[15px] lg:text-[17px]">
                      {currency}
                    </td>
                    <td
                      className={`flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 ${nowPriceClass} text-[4px] sm:text-[12px] md:text-[15px] lg:text-[17px]`}
                    >
                      ₩{Number(item.closing_price).toLocaleString()}
                    </td>
                    <td
                      className={` flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell text-[4px] sm:text-[12px] md:text-[15px] lg:text-[17px]`}
                    >
                      {Math.floor(item.units_traded).toLocaleString()}
                    </td>
                    <td
                      className={
                        "hidden flex-1 py-2 border-r border-gray-200 md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell text-[4px] sm:text-[12px] md:text-[15px] lg:text-[17px]"
                      }
                    >
                      ₩{Math.floor(item.acc_trade_value).toLocaleString()}
                    </td>
                    <td className="hidden md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell text-[4px] sm:text-[12px] md:text-[15px] lg:text-[17px]">
                      ₩{Number(item.prev_closing_price).toLocaleString()}
                    </td>
                    <td
                      className={`flex-1 py-2 md:flex-1 md:py-2 ${fluctuationClass} text-[4px] sm:text-[12px] md:text-[15px] lg:text-[17px]`}
                    >
                      <FontAwesomeIcon
                        icon={
                          item.fluctate_rate_24H >= 0 ? faCaretUp : faCaretDown
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
        <div />
      </section>
      <ScrollToTop />
    </main>
  );
};
