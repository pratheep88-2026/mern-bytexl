import axios from 'axios';

const API_URL = '/api';


// Get all events
export const getEvents = async () => {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
};


// Get single event
export const getEvent = async (id) => {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
};


// Create event
export const createEvent = async (eventData) => {
    const response = await axios.post(
        `${API_URL}/events`,
        eventData
    );
    return response.data;
};


// Update event
export const updateEvent = async (id, eventData) => {
    const response = await axios.put(
        `${API_URL}/events/${id}`,
        eventData
    );
    return response.data;
};


// Delete event
export const deleteEvent = async (id) => {
    const response = await axios.delete(
        `${API_URL}/events/${id}`
    );
    return response.data;
};