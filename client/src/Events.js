import axios from "axios";

const url = 'http://localhost:5000/api/posts/';
class Events {
    //get events
    static getEvents() {
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(e => ({
                        ...e
                    }))
                );
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }
    //get events for a specific day
    static getDayEvents(date) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}${date}`,{params: {date}} ).then((res) => {
                const data = res.data;
                console.log(res.data)
                resolve(
                    data.map(e => ({
                        ...e
                    }))
                );
            })
            .catch((err) =>{
                reject(err);
            })
        })
    }
    //create events
    static insertEvent(eventName, types, details, start, end, date){
        console.log(`From insertEvent:
        eventName: ${eventName}
        types: ${types}
        details: ${details}
        start: ${start}
        end: ${end}
        date: ${date}`)
        return axios.post(url, {
        eventName,
        types,
        details,
        start,
        end,
        date
        })
    }
    // delete events
    static deleteEvent(id){
return axios.delete(`${url}${id}`)
    }
    // edit events
}

export default Events;