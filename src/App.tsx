import { useState, useEffect } from "react";
import {
  generateImage,
  getGeoLocation,
  getWeatherData,
  generateChat,
} from "./api/api";
import "./App.css";
import { moodFeelings } from "./mood";

const formattedMonth = (month: number) => {
  switch (month) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "";
  }
};

function App() {
  const [imgUrl, setImgUrl] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [city, setCity] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<string>("Neutral");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingImg, setLoadingImg] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] =
    useState<string>("Loading weather...");

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    const mood = moodFeelings.find((m) => m.mood === selectedMood);
    const intervalFunction = () => {
      console.log("interval function");
      const randomIndex = Math.floor(
        Math.random() * mood!.loadingMessages.length
      );
      setLoadingMessage(mood!.loadingMessages[randomIndex]);
    };
    if (isLoading) {
      intervalFunction();
      interval = setInterval(() => intervalFunction(), 3000);
    } else if (interval) {
      console.log("CLEARING IN ELSE IF");
      clearInterval(interval);
    }

    return () => {
      console.log("CLEARING IN CLEAN UP");
      if (interval) clearInterval(interval);
    };
  }, [selectedMood, isLoading]);

  const handleImageLoad = () => {
    console.log("IMAGE LOADED");
    setLoadingImg(false);
  };

  const generateImg = (prompt: string) => {
    setLoadingImg(true);
    if (!prompt) {
      return Promise.reject;
    }
    return generateImage(prompt)
      .then((response) => {
        console.log("PROMPT IS: ", prompt);
        const {
          data: [{ url }],
        } = response;
        setImgUrl(url);
      })
      .catch(() => {
        console.log("failed to generate image");
      });
  };

  const getWeather = (lat: number, lon: number) => getWeatherData(lat, lon);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getWeatherDesc = (weatherData: any) => {
    const message = `
    Create a description of the weather of a place based on the provided weather data.
    Create the description as if you were feeling very ${selectedMood}.
    Weather data: ${JSON.stringify(weatherData)}
  `;
    return generateChat(message)
      .then((response) => {
        const {
          choices: [
            {
              message: { content },
            },
          ],
        } = response;
        setWeatherDesc(content);
      })
      .catch(() => {
        setWeatherDesc(
          `Sorry, way to ${selectedMood} to describe the weather.`
        );
      });
  };

  const getGeoLoc = () =>
    getGeoLocation(city).then((response) => {
      const [{ lat, lon }] = response;
      return { lat, lon };
    });

  const getCityWeather = (e: React.SyntheticEvent) => {
    if (isLoading) return;
    e.preventDefault();
    setIsLoading(true);
    getGeoLoc()
      .then((response) => {
        const { lat, lon } = response;
        return getWeather(lat, lon);
      })
      .then((weatherData) => {
        const {
          name,
          weather: [{ main, description }],
        } = weatherData;
        const now = new Date();
        console.log(JSON.stringify(now));
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        const currentTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

        const newPrompt = `Place: ${name}. Weather: ${main}, ${description}. Time is: ${currentTime}. Try to capture the feeling of being very ${selectedMood}. No numbers or symbols.`;
        const promises = [getWeatherDesc(weatherData), generateImg(newPrompt)];
        Promise.allSettled(promises).then(() => {
          setIsLoading(false);
        });
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start dark:bg-slate-800 dark:text-white root">
        <div>
          {/* <div className="flex items-center justify-center p-4 space-x-4"> */}
          <form className="flex items-end gap-x-4" onSubmit={getCityWeather}>
            <div className="flex flex-col">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City name
              </label>
              <input
                id="city"
                className="h-10 bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:border-indigo-500"
                type="text"
                value={city}
                disabled={isLoading}
                placeholder="City name"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="mood"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                How's your mood?
              </label>
              <select
                id="mood"
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="h-10 bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:border-indigo-500"
              >
                {moodFeelings.map((moodFeeling) => (
                  <option key={moodFeeling.mood} value={moodFeeling.mood}>
                    {moodFeeling.mood}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="h-10 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              Get City Weather
            </button>
          </form>
        </div>
        <div>
          <div className="flex items-center flex-col justify-center p-4 space-x-4 max-w-screen-sm">
            {!isLoading && imgUrl && (
              <>
                <img
                  className={`shadow-md transition-opacity duration-1000 ${loadingImg ? "opacity-0" : "opacity-100"}`}
                  height="600"
                  width="600"
                  src={imgUrl}
                  onLoad={handleImageLoad}
                  style={{
                    background: `url(${imgUrl})`,
                  }}
                />
                <p
                  className={`transition-opacity duration-1000 ${loadingImg ? "opacity-0" : "opacity-100"}`}
                >
                  {weatherDesc}
                </p>
              </>
            )}
            {(isLoading || loadingImg) && <p>{loadingMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
