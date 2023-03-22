import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

/**
 * 
 * with Data Pre-Rendering And Shallow Routing
 * when using this shallow routing concept along with pre-rendering we can simply use shallow url to fetch SEO friendly data  back from server
 */
const WdprShallowRouting = ({events}) => {
    const [eventsData, setEventsData] = useState(events);

    const router = useRouter()

    // client side data fetching
    const handleFiltering = async () => {
        const response = await fetch("http://localhost:4000/events?category=sports");
        const data = await response.json();
        setEventsData(data)
        // router.push("/csr/wdpr-shallow-routing/events?category=sports", undefined, {shallow: true})
        router.push("/csr/wdpr-shallow-routing?category=sports", undefined, {shallow: true})
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

export const getServerSideProps = async (context) => {
    const {query} = context;
    const {category} = query;
    // console.log(query, "query!!")
    const queryStr = category ? "category=sports" : ""

    const response = await fetch(`http://localhost:4000/events?${queryStr}`);
    const data = await response.json();

    return {
        props: { events: data }
    }
}

export default WdprShallowRouting