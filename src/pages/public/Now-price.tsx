/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { BithumbResponse, TradingChartApi } from "../../api/TradingChart-api";
import { ScrollToTop } from "../../api/ScrollToTop-api";

export const NowPrice: React.FC = () => {
  const [responseData, setResponseData] = useState<BithumbResponse | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    <div className="container md:top-0 md:mt-[6%] md:flex md:items-center md:justify-center ">
      <TradingChartApi onDataLoaded={onDataLoaded} />
      <div className="md:w-2/3">
        <div className="table-container">
          <table className="md:w-full">
            <thead className=" md:border-gray-200 md:text-center md:border-b md:shadow-md">
              <tr className="md:space-x-4 md:bg-gray-200 md:shadow-md">
                <th className="hidden md:flex-1 md:py-2 md:table-cell">
                  즐겨찾기
                </th>
                <th className="md:flex-1 md:py-2">가상코인</th>
                <th className="md:flex-1 md:py-2">현재가</th>
                <th className="md:flex-1 md:py-2">거래량</th>
                <th className="hidden md:flex-1 md:py-2 md:table-cell">
                  거래금액
                </th>
                <th className="hidden md:flex-1 md:py-2 md:table-cell">
                  전일종가(24h)
                </th>
                <th className="md:flex-1 md:py-2">변동률(24h)</th>
              </tr>
            </thead>
            <tbody className="md:text-center">
              {filteredCoins.map((currency: any) => {
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
                    ? "text-black"
                    : "text-blue-500";

                return (
                  <tr
                    key={currency}
                    className=" md:cursor-pointer md:hover:bg-[#efda7a] md:shadow"
                  >
                    <td className="hidden md:flex-1 md:py-2 md:table-cell md:border-r md:border-gray-200">
                      <FontAwesomeIcon icon={faStar} />
                    </td>
                    <td className="md:flex-1 md:py-2 md:border-r md:border-gray-200">
                      <Link to={`/trading-view/${currency}`}>{currency}</Link>
                    </td>
                    <td
                      className={`md:flex-1 md:py-2 md:border-r md:border-gray-200 ${nowPriceClass}`}
                    >
                      <Link to={`/trading-view/${currency}`}>
                        ₩{Number(item.opening_price).toLocaleString()}
                      </Link>
                    </td>
                    <td
                      className={
                        "md:flex-1 md:py-2 md:border-r md:border-gray-200"
                      }
                    >
                      <Link to={`/trading-view/${currency}`}>
                        {Math.floor(item.units_traded).toLocaleString()}
                      </Link>
                    </td>
                    <td
                      className={
                        "hidden md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell"
                      }
                    >
                      <Link to={`/trading-view/${currency}`}>
                        ₩{Math.floor(item.acc_trade_value).toLocaleString()}
                      </Link>
                    </td>
                    <td className="hidden md:flex-1 md:py-2 md:border-r md:border-gray-200 md:table-cell">
                      <Link to={`/trading-view/${currency}`}>
                        ₩{Number(item.prev_closing_price).toLocaleString()}
                      </Link>
                    </td>
                    <td className={`md:flex-1 md:py-2 ${fluctuationClass}`}>
                      <Link to={`/trading-view/${currency}`}>
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
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <ScrollToTop />
          </table>
        </div>
      </div>
      <div />
    </div>
  );
};
