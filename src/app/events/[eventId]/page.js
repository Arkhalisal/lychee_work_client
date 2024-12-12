"use client";

import { useEventStore } from "@/app/customHook/useEventStore";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faTicketAlt,
  faLanguage,
  faClock as faRuntime,
  faExclamationTriangle,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

export default function EventPage() {
  const { eventData } = useEventStore();
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setEvent(eventData.find((event) => event["@id"] === eventId));
    const loadingTimeout = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(loadingTimeout);
  }, [eventId, eventData]);

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-12">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!event && !isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-12">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Event not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-12">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event?.titlec}</h1>

          <div className="mb-6 space-y-2">
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 mr-2" />
              <span>{event?.predateC}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faClock} className="w-5 h-5 mr-2" />
              <span>{event?.progtimec}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 mr-2" />
              <span>{event?.venuec}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Movie Details</h2>
            <p className="text-gray-600">{event?.presenterorgc}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600">{event?.descc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5 mr-2" />
              <span>Age Limit: {event?.agelimitc || "N/A"}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faTicketAlt} className="w-5 h-5 mr-2" />
              <span>Price: {event?.pricec}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faLanguage} className="w-5 h-5 mr-2" />
              <span>{event?.remarkc}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faRuntime} className="w-5 h-5 mr-2" />
              <span>Runtime: {event?.progtimec}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 mr-2" />
              <span>Sale Date: {event?.saledate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 mr-2" />
              <span>Submit Date: {event?.submitdate}</span>
            </div>
            <div className="flex items-center text-blue-600 hover:text-blue-800">
              <FontAwesomeIcon icon={faLink} className="w-5 h-5 mr-2" />
              <a href={event?.tagenturlc} target="_blank" rel="noopener noreferrer">
                Ticket Purchase
              </a>
            </div>
            <div className="flex items-center text-blue-600 hover:text-blue-800">
              <FontAwesomeIcon icon={faLink} className="w-5 h-5 mr-2" />
              <a href={event?.urlc} target="_blank" rel="noopener noreferrer">
                Event Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
