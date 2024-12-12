"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMapMarkerAlt, faUsers } from "@fortawesome/free-solid-svg-icons";

import { useEventStore } from "@/app/customHook/useEventStore";

export default function Events() {
  const { eventData } = useEventStore();

  const [visibleEvents, setVisibleEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const eventsPerPage = 30; // Number of events to show per page
  const observer = useRef();

  console.log(eventData);

  useEffect(() => {
    // Load the initial events
    setVisibleEvents(eventData.slice(0, eventsPerPage));
  }, [eventData]);

  useEffect(() => {
    const loadMoreEvents = (entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setIsLoading(true); // Set loading to true

        // Delay loading more events by 0.5 seconds
        setTimeout(() => {
          setPage((prev) => prev + 1);
          setIsLoading(false); // Reset loading after events are fetched
        }, 500);
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observerInstance = new IntersectionObserver(loadMoreEvents, options);
    if (observer.current) {
      observerInstance.observe(observer.current);
    }

    return () => {
      if (observer.current) {
        observerInstance.unobserve(observer.current);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    const start = (page - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    setVisibleEvents(eventData.slice(0, end));
  }, [page, eventData]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-8">
      <div className="flex flex-col flex-grow max-w-[105rem] mx-auto w-full mt-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Events Page</h1>
        <p className="text-lg text-gray-600 mb-8">Number of events: {eventData.length}</p>
        <div className="flex flex-wrap -mx-3">
          {visibleEvents.map((event, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6 cursor-pointer"
              onClick={() => (window.location.href = `/events/${event.eventId}`)}
            >
              <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col flex-grow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">{event.titlec}</h2>
                  <div className="flex flex-col flex-grow space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>{event.predateC}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faUsers} className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>{event.presenterorgc}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>{event.venuec}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center h-10">
            <span className="text-gray-600">Loading more events...</span>
          </div>
        )}
        {/* Loading observer */}
        {!isLoading && <div ref={observer} className="h-10"></div>}
      </div>
    </div>
  );
}
