import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;

interface WeatherData {
  current: {
    last_updated: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_dir: string;
    uv: number;
  };
}

export const Route = createFileRoute('/weather')({
  component: Weather,
})

function Weather() {
  const [city, setCity] = useState('');

  const { data, isLoading, error, refetch } = useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: async () => {
      if (!city) throw new Error('City is required');
      const response = await fetch(
        `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city}`
      );
      return response.json();
    },
    enabled: false, // Don't run query on mount
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch(); // Manually trigger the query when form is submitted
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <h2>Weather Forecast</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            required
          />
          <button type="submit">Get Weather</button>
        </div>
      </form>
      
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div style={{ textAlign: 'center' }}>
          <p>Last Updated: {data.current.last_updated}</p>
          <img 
            src={`https:${data.current.condition.icon}`} 
            alt={data.current.condition.text}
            style={{ width: 64, height: 64 }}
          />
          <p>{data.current.condition.text}</p>
          <p>Temperature: {data.current.temp_c}°C</p>
          <p>Wind: {data.current.wind_kph} km/h {data.current.wind_dir}</p>
          {data.current.uv > 0 && <p>UV Index: {data.current.uv}</p>}
        </div>
      )}
    </div>
  )
} 