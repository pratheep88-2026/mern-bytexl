import { useEffect, useState } from 'react';

import EventCard from '../components/EventCard';

import {
    getEvents,
    deleteEvent
} from '../services/eventApi';


const Events = () => {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');


    const loadEvents = async () => {

        try {

            setLoading(true);

            const data = await getEvents();

            setEvents(data);

            setError('');

        } catch (err) {

            console.error(err);

            setError(
                'Unable to load events. Please check the server.'
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadEvents();

    }, []);


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            'Are you sure you want to delete this event?'
        );

        if (!confirmed) {
            return;
        }


        try {

            await deleteEvent(id);

            setEvents(
                events.filter((event) => event._id !== id)
            );

        } catch (err) {

            console.error(err);

            alert('Failed to delete event.');

        }
    };


    if (loading) {

        return (
            <div className="page-container">

                <h1>Mahendra Events</h1>

                <p>Loading events...</p>

            </div>
        );

    }


    return (
        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>🎓 Mahendra Events</h1>

                    <p>
                        Discover upcoming college events,
                        hackathons and workshops.
                    </p>

                </div>

            </div>


            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {events.length === 0 && !error ? (

                <div className="empty-state">

                    <h2>No events available</h2>

                    <p>
                        Create your first Mahendra event.
                    </p>

                </div>

            ) : (

                <div className="events-grid">

                    {events.map((event) => (

                        <EventCard
                            key={event._id}
                            event={event}
                            onDelete={handleDelete}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};


export default Events;