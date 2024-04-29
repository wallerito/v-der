import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

interface ImageGeneration {
  created: number,
  data: {
    url: string,
  }[],
}

interface GeoLocation {
    lat: number,
    lon: number,
}

export const generateChat = async (message: string): Promise<any> => {
  try {
    const { data } = await api.post('/chat', { message });
    return data;
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw error;
  }
};

export const generateImage = async (prompt: string): Promise<ImageGeneration> => {
  try {
    const { data } = await api.post('/generate-image', { prompt });
    return data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

export const getGeoLocation = async (city: string): Promise<GeoLocation[]> => {
  console.log(city);
  try {
    console.log('TRYING');
    const { data } = await api.get('/get-geo-location', {
      params: {
        cityName: city,
      }
    });
    return data;
  } catch (error) {
    console.error('Error getting geo location:', error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getWeatherData = async (lat: number, lon: number): Promise<any> => {
  try {
    const { data } = await api.get('/get-weather-data', {
      params: {
        lat,
        lon,
      }
    });
    return data;
  } catch (error) {
    console.error('Error getting weather data:', error);
    throw error;
  }
};