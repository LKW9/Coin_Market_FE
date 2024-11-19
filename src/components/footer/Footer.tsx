import { useDarkMode } from "../../context/Dark-mode";

export default function Footer() {
  const { darkMode } = useDarkMode();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="overflow-x-hidden overflow-y-hidden md:h-[173px] ">
      <div className=" shadow-md shadow-slate-200 my-[6px] mx-[2px] rounded-lg border-t-2 border-solid border-slate-200">
        <section className="w-screen">
          <div
            className={`md:flex items-center justify-between ${
              darkMode ? "dark" : "light"
            }`}
          >
            <div className="flex items-end md:items-center justify-center md:flex-col w-[300px]">
              <div className="w-[40%] md:w-[100px]">
                <img className="cursor-pointer"
                  src={`${darkMode ? "/footer-dark.png" : "/footer.png"}`}
                  alt={`${darkMode ? "Footer-dark" : "Footer"}`}
                  onClick={scrollToTop}
                />
              </div>
              <div
                className={`${
                  darkMode ? " text-white" : "mb-[20px] text-black"
                }`}
              >
              </div>
                <span className="text-[4px]">
                © 2023 CoinView.
                <br />
                All rights reserved
                </span>
            </div>

            <div className=" hidden md:block visible w-[800px] ">
              <div className=" flex items-center justify-center ml-40 overflow-hidden my-[10px] ">
                <div className="mx-auto">
                  <div className="my-[2px] text-center ">
                    <h2 className="font-bold">GitHub</h2>
                  </div>
                  <ul className="flex-1 flex items-center justify-between w-[100%] p-[10px]">
                    <li className="w-[80px]">
                      <a
                        href="https://github.com/FullStackWeavers"
                        className="cursor-pointer group"
                      >
                        <div className="overflow-hidden transition-opacity duration-500 border-2 rounded-lg group-hover:opacity-100 opacity-80">
                          <img
                            src="https://avatars.githubusercontent.com/u/144097591?s=200&v=4"
                            alt="FullStackWeavers's github link"
                            className="md:w-[100%]"
                          />
                        </div>
                      </a>
                      <p className="text-[1px] text-center">FullStackWeavers</p>
                    </li>
                  </ul>
                </div>

                <div className="mx-auto ">
                  <div className="my-[2px] text-center">
                    <h2 className="font-bold">CoinView's Developers</h2>
                  </div>

                  <div className="flex flex-1">
                    <ul className="flex items-center justify-between w-[100%] p-[10px]">
                      <li className="w-[80px]">
                        <a
                          href="https://github.com/qndrl1004"
                          className="cursor-pointer group"
                        >
                          <div className="overflow-hidden transition-opacity duration-500 border-2 rounded-lg group-hover:opacity-100 opacity-80">
                            <img
                              src="https://avatars.githubusercontent.com/u/82863770?v=4"
                              alt="정붕기 깃허브 프로필"
                              className="md:w-[100%]"
                            />
                          </div>
                        </a>
                        <p className="text-[1px] text-center">qndrl1004</p>
                      </li>
                      <li className="w-[80px] mx-[10px]">
                        <a
                          href="https://github.com/Ju-jh"
                          className="cursor-pointer group"
                        >
                          <div className="overflow-hidden transition-opacity duration-500 border-2 rounded-lg group-hover:opacity-100 opacity-80">
                            <img
                              src="https://avatars.githubusercontent.com/u/121030294?v=4"
                              alt="주재훈 깃허브 프로필"
                              className="md:w-[100%]"
                            />
                          </div>
                        </a>
                        <p className="text-[1px] text-center">Ju-jh</p>
                      </li>
                      <li className="w-[80px] mr-[10px]">
                        <a
                          href="https://github.com/LKW9"
                          className="cursor-pointer group"
                        >
                          <div className="overflow-hidden transition-opacity duration-500 border-2 rounded-lg group-hover:opacity-100 opacity-80">
                            <img
                              src="https://avatars.githubusercontent.com/u/92284361?v=4"
                              alt="이기웅 깃허브 프로필"
                              className="w-[100%]"
                            />
                          </div>
                        </a>
                        <p className="text-[1px] text-center">LKW9</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
