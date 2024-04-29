import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

app.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    // console.log('weatherData', weatherData);

    // const messageContent = `Create a promt for dall-e to create an photo realistic image of what it could look like at a certain place based on the provided weather data, the important parts are the place and the weather, but take time of day into consideration. Super Important!: There should be no text or symbols in the image.
    //  ${JSON.stringify(weatherData)}
    // `
    // const messageContent = `create a ${mood} description of the weather at a current place based on provided weather data. Any temperatures is in Kelvin, convert it to celsius:
    //  ${JSON.stringify(weatherData)}
    // `

    // const messageContent = `
    //   Create a description of the weather of a place based on the provided weather data.
    //   Create the description as if you were feeling very ${mood}.
    //   Weather data: ${JSON.stringify(weatherData)}
    // `

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages:[
          {role:'user', content: message}
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error generating prompt:', error);
    res.status(500).json({ error: 'Failed to generate prompt' });
  }
});

app.post('/generate-image', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-3',
        prompt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.get('/get-geo-location', async (req, res) => {
  try {
    const { cityName } = req.query;

    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${OPENWEATHERMAP_API_KEY}`;

    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching geo-location:', error);
    res.status(500).json({ error: 'Failed to fetch geo-location data' });
  }
});

app.get('/get-weather-data', async (req, res) => {
  console.log('CALLED');
  try {
    const { lat, lon } = req.query;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;

    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeFullReload", () => {
    server.close();
  });
}
