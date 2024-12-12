"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect } from "react";

import { useEventStore } from "@/app/customHook/useEventStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { setEventData, setLocationData } = useEventStore();

  useEffect(() => {
    async function fetchEventData() {
      const response = await fetch("http://localhost:3001/getEventInfo");
      const data = await response.json();

      const venueResponse = await fetch("http://localhost:3001/getEventVenueInfo");
      const venueData = await venueResponse.json();

      const combinedData = data.map((event) => {
        const venue = venueData[event.venueid];
        return {
          ...event,
          venuec: venue.venuec,
          venuee: venue.venuee,
          latitude: venue.latitude,
          longitude: venue.longitude,
        };
      });

      setEventData(combinedData);
      setLocationData(venueData);
    }
    fetchEventData();
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-row justify-center items-center gap-12 absolute left-1/2 transform -translate-x-1/2 bg-slate-400 w-full h-12">
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/location">Location</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
