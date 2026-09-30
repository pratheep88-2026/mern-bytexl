import { useState } from 'react';
import { createEvent } from '../services/eventApi';

const EventForm = ({ onEventCreated }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        venue: '',
        maxParticipants: '',
        status: 'Upcoming'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');

        if (
            !formData.title ||
            !formData.description ||
            !formData.date ||
            !formData.venue ||
            !formData.maxParticipants
        ) {
            setError('Please fill in all fields.');
            return;
        }

        try {

            setLoading(true);

            const newEvent = await createEvent({
                ...formData,
                maxParticipants: Number(formData.maxParticipants)
            });

            setSuccess('Event created successfully!');

            setFormData({
                title: '',
                description: '',
                date: '',
                venue: '',
                maxParticipants: '',
                status: 'Upcoming'
            });

            if (onEventCreated) {
                onEventCreated(newEvent);
            }

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.error ||
                'Failed to create event.'
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="form-container">

            <div className="form-header">

                <h1>➕ Create New Event</h1>

                <p>
                    Add a new campus event, workshop or hackathon.
                </p>

            </div>

            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            {success && (
                <div className="form-success">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>Event Title</label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Example: AI Hackathon"
                    />

                </div>


                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the event..."
                        rows="5"
                    />

                </div>


                <div className="form-row">

                    <div className="form-group">

                        <label>Date</label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>Venue</label>

                        <input
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            placeholder="Example: Computer Lab"
                        />

                    </div>

                </div>


                <div className="form-row">

                    <div className="form-group">

                        <label>Maximum Participants</label>

                        <input
                            type="number"
                            name="maxParticipants"
                            value={formData.maxParticipants}
                            onChange={handleChange}
                            min="1"
                            placeholder="100"
                        />

                    </div>


                    <div className="form-group">

                        <label>Event Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >

                            <option value="Upcoming">
                                Upcoming
                            </option>

                            <option value="Ongoing">
                                Ongoing
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                        </select>

                    </div>

                </div>


                <button
                    type="submit"
                    className="create-event-button"
                    disabled={loading}
                >

                    {loading
                        ? 'Creating Event...'
                        : 'Create Event'
                    }

                </button>

            </form>

        </div>
    );
};

export default EventForm;