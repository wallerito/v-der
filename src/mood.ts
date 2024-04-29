
export const moodFeelings = [
    {
    mood: "Neutral",
    loadingMessages: [
        "Fetching weather data...",
        "Gathering forecast...",
        "Loading weather updates...",
        "Stay balanced, forecast loading...",
        "Neutral outlook loading...",
        "Bringing you a neutral perspective through your forecast...",
        "Loading neutrality into your forecast...",
    ],
    },
  {
    mood: "Happy",
    loadingMessages: [
      "Fetching sunshine data...",
      "Gathering happiness forecast...",
      "Loading bright and sunny outlook...",
      "Preparing to spread joy through weather updates...",
      "Sunshine incoming, happiness loading...",
      "Getting ready to make your day brighter...",
      "Loading positivity into your forecast...",
    ],
  },
  {
    mood: "Sad",
    loadingMessages: [
      "Retrieving cloudy skies data...",
      "Gathering rain forecast...",
      "Loading stormy weather information...",
      "Weathering the sadness, forecast on its way...",
      "Brace yourself for rainy forecasts, loading...",
      "Preparing for a gloomy outlook...",
      "Loading a silver lining for your cloudy day...",
    ],
  },
  {
    mood: "Excited",
    loadingMessages: [
      "Eagerly fetching electrifying weather data...",
      "Gathering thrilling forecast...",
      "Loading exciting weather updates...",
      "Ready for an adventure? Weather data incoming...",
      "Excitement levels rising as forecast loads...",
      "Buckle up for an exhilarating forecast...",
      "Loading anticipation into your forecast...",
    ],
  },
  {
    mood: "Calm",
    loadingMessages: [
      "Fetching serene weather data...",
      "Gathering tranquil forecast...",
      "Loading peaceful skies information...",
      "Embrace tranquility, weather updates on their way...",
      "Stay calm, forecast loading peacefully...",
      "Bringing serenity to your forecast...",
      "Loading relaxation into your day...",
    ],
  },
  {
    mood: "Anxious",
    loadingMessages: [
      "Anxiously fetching weather data...",
      "Gathering forecast, please hold...",
      "Loading imminent weather updates...",
      "Hold onto your hats, weather data incoming...",
      "Anxious about the forecast? Updates loading...",
      "Loading anticipation and nerves into your forecast...",
      "Forecasting with bated breath...",
    ],
  },
  {
    mood: "Hopeful",
    loadingMessages: [
      "Fetching optimistic weather updates...",
      "Gathering hopeful forecast...",
      "Loading brighter days ahead...",
      "Hope is on the horizon, forecast loading...",
      "Optimism loading, weather updates underway...",
      "Loading hope into your forecast...",
      "Bringing optimism to your weather outlook...",
    ],
  },
  {
    mood: "Frustrated",
    loadingMessages: [
      "Frustratingly fetching weather data...",
      "Gathering forecast, patience required...",
      "Loading weather updates, please wait...",
      "Frustration levels rising as forecast loads...",
      "Hang in there, forecast loading in progress...",
      "Loading frustration into your forecast...",
      "Bracing for a test of patience...",
    ],
  },
  {
    mood: "Curious",
    loadingMessages: [
      "Curiously fetching weather insights...",
      "Gathering forecast, stay tuned...",
      "Loading intriguing weather updates...",
      "Weather data, satisfy your curiosity...",
      "Stay curious, forecast loading intriguingly...",
      "Loading curiosity into your forecast...",
      "Bringing you weather insights to satisfy your curiosity...",
    ],
  },
  {
    mood: "Confused",
    loadingMessages: [
      "Confusedly fetching weather data...",
      "Gathering clarity, weather updates loading...",
      "Loading weather insights, stay informed...",
      "Confusion clearing, forecast on its way...",
      "Forecast loading, confusion dissipating...",
      "Loading clarity into your forecast...",
      "Bringing clarity to your weather outlook...",
    ],
  },
  {
    mood: "Energetic",
    loadingMessages: [
      "Energetically fetching dynamic weather data...",
      "Gathering forecast, stay charged...",
      "Loading high-energy weather updates...",
      "Energy levels rising as forecast loads...",
      "Get ready for an energetic forecast, loading...",
      "Loading energy into your forecast...",
      "Bringing excitement and energy to your day...",
    ],
  },
  {
    mood: "Peaceful",
    loadingMessages: [
      "Gathering tranquility for the forecast...",
      "Loading peaceful weather data...",
      "Forecasting serenity, loading...",
      "Embrace peace, weather updates loading...",
      "Peacefulness loading, forecast on its way...",
      "Loading peace into your forecast...",
      "Bringing you a sense of calm through your forecast...",
    ],
  },
  {
    mood: "Surprised",
    loadingMessages: [
      "Surprisingly fetching weather data...",
      "Gathering forecast, prepare for surprises...",
      "Loading unexpected weather updates...",
      "Weather surprises in store, loading...",
      "Stay surprised, forecast loading surprisingly...",
      "Loading surprise into your forecast...",
      "Bringing unexpected twists to your weather outlook...",
    ],
  },
  {
    mood: "Skeptical",
    loadingMessages: [
      "Fetching weather data skeptically...",
      "Gathering forecast, skepticism loading...",
      "Loading skeptical weather updates...",
      "Approach with caution, forecast loading...",
      "Skepticism levels rising, weather data loading...",
      "Loading skepticism into your forecast...",
      "Bringing a critical eye to your weather outlook...",
    ],
  },
  {
    mood: "Relaxed",
    loadingMessages: [
      "Relaxedly fetching weather data...",
      "Gathering forecast, enjoy the calm...",
      "Loading laid-back weather updates...",
      "Forecasting relaxation, loading...",
      "Stay relaxed, forecast loading smoothly...",
      "Loading relaxation into your forecast...",
      "Bringing you a sense of ease through your weather outlook...",
    ],
  },
  {
    mood: "Adventurous",
    loadingMessages: [
      "Adventurously fetching weather data...",
      "Gathering forecast, embrace the adventure...",
      "Loading adventurous weather updates...",
      "Adventure awaits in the forecast, loading...",
      "Stay adventurous, forecast loading boldly...",
      "Loading adventure into your forecast...",
      "Bringing you exciting journeys through your weather outlook...",
    ],
  },
  {
    mood: "Nostalgic",
    loadingMessages: [
      "Nostalgically fetching weather data...",
      "Gathering forecast, reminiscing...",
      "Loading nostalgic weather updates...",
      "Transporting you to the past through your forecast...",
      "Stay nostalgic, forecast loading sentimentally...",
      "Loading nostalgia into your forecast...",
      "Bringing back memories with your weather outlook...",
    ],
  },
  {
    mood: "Confident",
    loadingMessages: [
      "Confidently fetching weather data...",
      "Gathering forecast, trust the process...",
      "Loading confident weather updates...",
      "Assured forecasts incoming, loading...",
      "Stay confident, forecast loading securely...",
      "Loading confidence into your forecast...",
      "Bringing assurance to your weather outlook...",
    ],
  },
];

// Example usage:
const randomMoodIndex = Math.floor(Math.random() * moodFeelings.length);
const randomMood = moodFeelings[randomMoodIndex];
const randomMessageIndex = Math.floor(Math.random() * randomMood.loadingMessages.length);
const randomMessage = randomMood.loadingMessages[randomMessageIndex];

console.log(`Mood: ${randomMood.mood}`);
console.log(`Loading Message: ${randomMessage}`);
``