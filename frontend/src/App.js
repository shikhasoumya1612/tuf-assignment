import { useEffect, useState } from "react";
import "./App.css";
import "./styles/Hero.css";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import ImageCards from "./components/ImageCards";
import Loader from "./components/Loader";
import { useDarkMode } from "./context/DarkModeContext";
import { BACKEND_URL } from "./Constants";

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isBannerVisibleForAll, setIsBannerVisibleForAll] = useState(false);
  const [bannerSettings, setBannerSettings] = useState({
    bannerOn: false,
    bannerHeading: "",
    bannerSubHeading: "",
    bannerEndTime: "",
    bannerLink: "",
  });

  const fetchBannerSettings = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/api/v1/banner");
      const bannerData = response.data.data;

      if (bannerData) {
        setBannerSettings({
          bannerOn: bannerData.banner_on,
          bannerHeading: bannerData.banner_heading,
          bannerSubHeading: bannerData.banner_sub_heading,
          bannerEndTime: bannerData.banner_end_time,
          bannerLink: bannerData.banner_link,
        });

        const currentTime = new Date().getTime();
        const bannerEndTime = new Date(bannerData.banner_end_time).getTime();

        if (currentTime <= bannerEndTime && bannerData.banner_on) {
          setIsBannerVisibleForAll(true);
        } else {
          setIsBannerVisibleForAll(false);
        }
      }
    } catch (error) {
      console.error(
        "Error fetching banner settings:",
        error.response?.data || error.message
      );
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchBannerSettings();
  }, []);

  const toggleBannerOnSettings = () => {
    setBannerSettings((prev) => ({
      ...prev,
      bannerOn: !bannerSettings.bannerOn,
    }));
  };

  return (
    <BrowserRouter>
      {showLoader && <Loader />}

      <div className={`${isDarkMode ? "dark" : "light"}`}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={toggleDarkMode} />
        <Banner
          isVisible={isBannerVisibleForAll}
          setIsVisible={setIsBannerVisibleForAll}
          bannerSettings={bannerSettings}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div className="hero">
                <div>
                  <h1>
                    Gear Up for <span className="text-red">Success</span>: Your
                    Ultimate Preparation Hub!
                  </h1>

                  <p>
                    Navigate Your Learning Adventure: Explore DSA, Master CS
                    Concepts, Design Systems, Hone Competitive Skills, and Ace
                    Interviews Effortlessly
                  </p>
                </div>

                <ImageCards />
              </div>
            }
          />

          <Route
            path="/admin"
            element={
              <Dashboard
                bannerSettings={bannerSettings}
                setBannerSettings={setBannerSettings}
                toggleBannerOnSettings={toggleBannerOnSettings}
                fetchBannerSettings={fetchBannerSettings}
                setShowLoader={setShowLoader}
              />
            }
          />

          <Route path="*" element={<p>ERROR 404</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
