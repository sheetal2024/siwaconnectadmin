"use client";

import { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiInfo, FiMapPin } from "react-icons/fi";

export default function UpcomingEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://10.10.97.248:3001/api/events/all-events"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleMarkAsCompleted = async (eventId: string) => {
    try {
      const response = await fetch(
        `http://10.10.97.248:3001/api/events/complete-event/${eventId}`,
        { method: "PUT" }
      );

      if (!response.ok) {
        throw new Error("Failed to mark event as completed");
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, status: "completed" } : event
        )
      );

      const updatedEvents = await fetch(
        "http://10.10.97.248:3001/api/events/all-events"
      );
      const data = await updatedEvents.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Events Overview
        </h2>
        <div>
          <p className="text-lg font-medium text-gray-600">
            Total Upcoming Events
          </p>
          <p className="text-3xl font-bold text-blue-600">
            {events.filter((event) => event.status === "upcoming").length}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Upcoming Events List
        </h2>
        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : events.length > 0 ? (
          <div className="space-y-4">
            {events
              .filter((event) => event.status === "upcoming")
              .map((event: any) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
                >
                  <img
                    src={`http://10.10.97.248:3001/uploads/${event.event_image}`}
                    alt={event.event_title}
                    className="w-32 h-32 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {event.event_title}
                    </h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FiCalendar className="mr-2" /> {event.event_date}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <FiClock className="mr-2" /> {event.event_time}
                    </p>
                    <p className="text-gray-700 mt-2 flex items-start">
                      <FiInfo className="mr-2 mt-1" /> {event.event_description}
                    </p>
                    <p className="text-gray-700 mt-2 flex items-start">
                      <FiMapPin className="mr-2 mt-1" /> {event.event_location}
                    </p>
                    <button
                      onClick={() => handleMarkAsCompleted(event.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Mark as Completed
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-600">No events available.</p>
        )}
      </div>
    </div>
  );
}
