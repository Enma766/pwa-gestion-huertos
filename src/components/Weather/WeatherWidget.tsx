import React, { useEffect, useState } from 'react';
import './WeatherWidget.css';

interface WeatherData {
  temperature: number;
  conditionText: string;
  adviceText: string;
  adviceEmoji: string;
  isRainy: boolean;
}

const WEATHER_CACHE_KEY = 'huerto_pwa_weather_cache';

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    conditionText: 'Soleado',
    adviceText: 'Ideal para regar',
    adviceEmoji: '🌤️',
    isRainy: false,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const interpretWeather = (temp: number, code: number): WeatherData => {
    const roundedTemp = Math.round(temp);

    // Códigos WMO de Open-Meteo
    if (code >= 51 && code <= 99) {
      return {
        temperature: roundedTemp,
        conditionText: 'Lluvioso',
        adviceText: 'Ahorra agua, hoy llueve',
        adviceEmoji: '🌧️',
        isRainy: true,
      };
    }

    if (code >= 1 && code <= 3) {
      return {
        temperature: roundedTemp,
        conditionText: 'Parcialmente nublado',
        adviceText: 'Ideal para regar y abonar',
        adviceEmoji: '⛅',
        isRainy: false,
      };
    }

    if (roundedTemp > 30) {
      return {
        temperature: roundedTemp,
        conditionText: 'Caluroso',
        adviceText: 'Riega al atardecer para evitar evaporación',
        adviceEmoji: '☀️',
        isRainy: false,
      };
    }

    return {
      temperature: roundedTemp,
      conditionText: 'Soleado',
      adviceText: 'Ideal para regar',
      adviceEmoji: '🌤️',
      isRainy: false,
    };
  };

  useEffect(() => {
    // 1. Cargar caché local primero por si no hay internet
    const cached = localStorage.getItem(WEATHER_CACHE_KEY);
    if (cached) {
      try {
        setWeather(JSON.parse(cached));
        setLoading(false);
      } catch {
        localStorage.removeItem(WEATHER_CACHE_KEY);
      }
    }

    // 2. Función para consultar Open-Meteo (sin API Key)
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await res.json();

        if (data && data.current_weather) {
          const newWeather = interpretWeather(
            data.current_weather.temperature,
            data.current_weather.weathercode
          );
          setWeather(newWeather);
          localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(newWeather));
        }
      } catch {
        // Si falla por falta de red, mantiene los datos en caché o por defecto
      } finally {
        setLoading(false);
      }
    };

    // 3. Intentar obtener ubicación o usar coordenadas por defecto
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(8.62, -70.20), // Coordenadas de respaldo si se rechaza el permiso
        { timeout: 5000 }
      );
    } else {
      fetchWeather(8.62, -70.20);
    }
  }, []);

  return (
    <section className="weather-card" aria-label="Clima actual">
      <div className="weather-icon-wrapper">
        <div className={`sun-circle-outer ${weather.isRainy ? 'rainy' : ''}`}>
          <div className="sun-circle-inner" />
        </div>
      </div>

      <div className="weather-info">
        <h2 className="weather-title">
          {loading ? 'Cargando clima...' : `${weather.temperature}°C ${weather.conditionText}`}
        </h2>
        <p className="weather-subtitle">
          {weather.adviceText} <span>{weather.adviceEmoji}</span>
        </p>
      </div>
    </section>
  );
};