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
    static insertEvent(types, details, start, end, date, instructor, repeat){
        console.log(`From insertEvent:
        types: ${types}
        details: ${details}
        start: ${start}
        end: ${end}
        date: ${date}
        instructor: ${instructor}
        repeat: ${repeat}`)
    
        return axios.post(url, {
        types,
        details,
        start,
        end,
        date,
        instructor,
        repeat
        })
    }
    // delete events
    static deleteEvent(id){
return axios.delete(`${url}${id}`)
    }
    // edit events
}

export default Events;