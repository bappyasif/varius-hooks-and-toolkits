import React, { useEffect, useState } from 'react'

const EventsList = ({ events }) => {
    // const [eventsData, setEventsData] = useState([]);
    const [eventsData, setEventsData] = useState(events);

    // client side data fetching
    const handleFiltering = async () => {
        const response = await fetch("http://localhost:4000/events?category=sports");
        const data = await response.json();
        setEventsData(data)
    }

    // useEffect(() => {
    //     setEventsData(events)
    // }, [events])

    return (
        <>
            <div>EventsList</div>
            <button onClick={handleFiltering}>Sports Only</button>
            {
                eventsData?.map(event => {
                    return (
                        <div key={event.id}>
                            <h2>{event.id} : {event.title} -- {event.date} | {event.category}</h2>
                            <p>{event.description}</p>
                            <hr />
                            <br />
                        </div>
                    )
                })
            }
        </>
    )
}

// static generation with pre-rendering
export const getStaticProps = async () => {
    const response = await fetch("http://localhost:4000/events");
    const data = await response.json();

    return {
        props: { events: data }
    }
}

export default EventsList