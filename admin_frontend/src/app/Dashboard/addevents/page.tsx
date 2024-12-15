"use client";

import React, { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiAlertCircle,
  FiImage,
} from "react-icons/fi";

function AddEvents() {
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!eventTitle.trim()) newErrors.eventTitle = "Event title is required";
    if (!eventDescription.trim())
      newErrors.eventDescription = "Event description is required";
    if (!eventDate) newErrors.eventDate = "Event date is required";
    if (!eventTime) newErrors.eventTime = "Event time is required";
    if (!eventLocation.trim())
      newErrors.eventLocation = "Event location is required";
    if (!eventImage) newErrors.eventImage = "Event image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("eventTitle", eventTitle);
      formData.append("eventDescription", eventDescription);
      formData.append("eventDate", eventDate);
      formData.append("eventTime", eventTime);
      formData.append("eventLocation", eventLocation);

      if (eventImage) formData.append("eventImage", eventImage);

      try {
        const response = await fetch(
          "http://10.10.97.248:3001/api/events/add-event",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          alert("Event created successfully!");
        } else {
          const error = await response.text();
          alert(`Error: ${error}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the event.");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEventImage(e.target.files[0]);
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Event</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Event Creation Overview
        </h2>
        <p className="text-gray-600">
          Create a new event by filling out the form below. All fields are
          required to ensure complete event information.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="event-title"
              className="block text-sm font-medium text-gray-700"
            >
              Event Title
            </label>
            <input
              type="text"
              id="event-title"
              name="event-title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
                errors.eventTitle ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.eventTitle ? "true" : "false"}
              aria-describedby={
                errors.eventTitle ? "event-title-error" : undefined
              }
            />
            {errors.eventTitle && (
              <p id="event-title-error" className="mt-2 text-sm text-red-600">
                <FiAlertCircle className="inline mr-1" />
                {errors.eventTitle}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="event-description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="event-description"
              name="event-description"
              rows={4}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
                errors.eventDescription ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.eventDescription ? "true" : "false"}
              aria-describedby={
                errors.eventDescription ? "event-description-error" : undefined
              }
            />
            {errors.eventDescription && (
              <p
                id="event-description-error"
                className="mt-2 text-sm text-red-600"
              >
                <FiAlertCircle className="inline mr-1" />
                {errors.eventDescription}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="event-date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="event-date"
                  name="event-date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className={`block w-full pl-10 px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
                    errors.eventDate ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.eventDate ? "true" : "false"}
                  aria-describedby={
                    errors.eventDate ? "event-date-error" : undefined
                  }
                />
              </div>
              {errors.eventDate && (
                <p id="event-date-error" className="mt-2 text-sm text-red-600">
                  <FiAlertCircle className="inline mr-1" />
                  {errors.eventDate}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="event-time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="text-gray-400" />
                </div>
                <input
                  type="time"
                  id="event-time"
                  name="event-time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className={`block w-full pl-10 px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
                    errors.eventTime ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.eventTime ? "true" : "false"}
                  aria-describedby={
                    errors.eventTime ? "event-time-error" : undefined
                  }
                />
              </div>
              {errors.eventTime && (
                <p id="event-time-error" className="mt-2 text-sm text-red-600">
                  <FiAlertCircle className="inline mr-1" />
                  {errors.eventTime}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="event-location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="text-gray-400" />
              </div>
              <input
                type="text"
                id="event-location"
                name="event-location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className={`block w-full pl-10 px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
                  errors.eventLocation ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.eventLocation ? "true" : "false"}
                aria-describedby={
                  errors.eventLocation ? "event-location-error" : undefined
                }
              />
            </div>
            {errors.eventLocation && (
              <p
                id="event-location-error"
                className="mt-2 text-sm text-red-600"
              >
                <FiAlertCircle className="inline mr-1" />
                {errors.eventLocation}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="event-image"
              className="block text-sm font-medium text-gray-700"
            >
              Event Image
            </label>
            <div className="mt-1 relative">
              <input
                type="file"
                id="event-image"
                name="event-image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.eventImage && (
                <p id="event-image-error" className="mt-2 text-sm text-red-600">
                  <FiAlertCircle className="inline mr-1" />
                  {errors.eventImage}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvents;
