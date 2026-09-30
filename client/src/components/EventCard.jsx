const EventCard = ({ event, onDelete }) => {

    const formattedDate = new Date(event.date).toLocaleDateString(
        'en-IN',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }
    );

    return (
        <div className="event-card">

            <div className="event-card-header">

                <span className="event-status">
                    {event.status}
                </span>

            </div>


            <h2>{event.title}</h2>

            <p className="event-description">
                {event.description}
            </p>


            <div className="event-info">

                <p>
                    📅 <strong>Date:</strong> {formattedDate}
                </p>

                <p>
                    📍 <strong>Venue:</strong> {event.venue}
                </p>

                <p>
                    👥 <strong>Participants:</strong>{' '}
                    {event.maxParticipants}
                </p>

            </div>


            <div className="event-actions">

                <button className="view-button">
                    View Details
                </button>

                <button
                    className="delete-button"
                    onClick={() => onDelete(event._id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default EventCard;