"use client";

import React, { useState, useEffect } from "react";
import { FiCalendar, FiMapPin, FiTrash2 } from "react-icons/fi";

const CompletedEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompletedEvents = async () => {
      try {
        const response = await fetch(
          "http://10.10.97.248:3001/api/events/completed-events"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch completed events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedEvents();
  }, []);

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(
        `http://10.10.97.248:3001/api/events/delete-completed-event/${eventId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Completed Events</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : events.length > 0 ? (
          events.map((event: any) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {event.event_title}
                </h3>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gray-600 flex items-center">
                  <FiCalendar className="mr-2 text-gray-400" />
                  {event.event_date}
                </p>
                <p className="text-gray-600 flex items-center">
                  <FiMapPin className="mr-2 text-gray-400" />
                  {event.event_location}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md p-2 transition duration-200"
                  aria-label={`Delete ${event.event_title}`}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No completed events available.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedEvents;
