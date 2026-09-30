import { useNavigate } from 'react-router-dom';

import EventForm from '../components/EventForm';


const CreateEvent = () => {

    const navigate = useNavigate();


    const handleEventCreated = () => {

        setTimeout(() => {
            navigate('/events');
        }, 1000);

    };


    return (
        <div className="page-container">

            <EventForm
                onEventCreated={handleEventCreated}
            />

        </div>
    );
};


export default CreateEvent;