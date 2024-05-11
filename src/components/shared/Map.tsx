'use client'
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
          version: 'weekly',
        });

        const google = await loader.load();

        const position = {
          lat: 51.5074,
          lng: -0.1278,
        };

        const mapOptions: google.maps.MapOptions = {
          center: position,
          zoom: 12,
          mapTypeId: 'roadmap',
        };

        const map = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);

        const marker = new google.maps.Marker({
          position,
          map,
        });
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        // Handle the error, display a message, or fallback to a different map solution
      }
    };

    loadMap();

    // Cleanup function
    return () => {
      // Do any necessary cleanup here, such as removing event listeners
    };
  }, []);

  return <div className="w-full h-[300px]" ref={mapRef} />;
};

export default Map;
