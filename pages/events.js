import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function EventsList({ events }) {
    let [sportsEvents, setSportsEvent] = useState()
    const router = useRouter();

    const handleSports = async () => {
        const response = await fetch("http://localhost:4000/events?category=sports");
        const data = await response.json();
        setSportsEvent(data);

        // we will make use of shallow url so that we can later on share this url withothers to see as we are seeing after filtering
        // we will simply push this "route" on to router browse history so that when server side props look for it in url they get to extract category from this and fetch relevant data
        router.push("/events?category=sports", undefined, {shallow: true})
    }

    // const fetchData = async (filteringStr) => {
    //     const response = await fetch(`http://localhost:4000/events?category=${filteringStr}`);
    //     const data = await response.json();
    //     setSportsEvent(data);
    //     // router.push(`/events?category=${filteringStr}`, undefined, {shallow: true})
    //     const urlStr = filteringStr ? `/events?category=${filteringStr}` : `/events`
    //     router.push(urlStr, undefined, {shallow: true})
    // }

    const fetchData = async (filteringStr) => {
        const endpoint = filteringStr ? `?category=${filteringStr}` : ""
        const response = await fetch(`http://localhost:4000/events${endpoint}`);
        const data = await response.json();
        setSportsEvent(data);
        // router.push(`/events?category=${filteringStr}`, undefined, {shallow: true})
        const urlStr = filteringStr ? `/events?category=${filteringStr}` : `/events`
        router.push(urlStr, undefined, {shallow: true})
    }

    const handleCategoryFilteredEvents = (e, t) => {
        let filteringStr = "";
        if(t === "sports") {
            filteringStr = "sports"
        } else if(t === "politics") {
            filteringStr = "politics"
        } else if(t === "food") {
            filteringStr = "food"
        } else if(t === "technology") {
            filteringStr = "technology"
        }

        fetchData(filteringStr)
    }

    useEffect(() => {
        setSportsEvent(events)
    }, [])

    return (
        <main>
            {/* <button onClick={handleSports}>Sports Category</button> */}
            <button onClick={(e) => handleCategoryFilteredEvents(e, "")}>All Category</button>
            <button onClick={(e) => handleCategoryFilteredEvents(e, "sports")}>Sports Category</button>
            <button onClick={(e) => handleCategoryFilteredEvents(e, "politics")}>Politics Category</button>
            <button onClick={(e) => handleCategoryFilteredEvents(e, "food")}>Food Category</button>
            <button onClick={(e) => handleCategoryFilteredEvents(e, "technology")}>Technology Category</button>
            <h1>EventsList</h1>
            {
                // events?.map(event => {
                sportsEvents?.map(event => {
                    return (
                        <section key={event.id}>
                            <h2>{event.id} -- {event.title} -- {event.date} || {event.category}</h2>
                            <h4>{event.description}</h4>
                        </section>
                    )
                })
            }
        </main>
    )
}

export const getServerSideProps = async (context) => {
    const {query} = context;
    const {category} = query;
    // console.log(category)
    const queryString = category ? `category=${category}` : "";
    
    // make use of shallow url paramns extraction so that when page reloads with this url we could only filter out data as expected and keeping SEO friendly as well
    const response = await fetch(`http://localhost:4000/events?${queryString}`);
    const data = await response.json();

    // this wont give us benefits of SEO after we have used Shallow Url from Page, as both filtered and initial query string is exactly same
    // const response = await fetch("http://localhost:4000/events");
    // const data = await response.json();

    return {
        props: {
            events: data
        }
    }
}

export default EventsList