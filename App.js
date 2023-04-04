import React, { useEffect, useState } from "react";

function Tasks() {

    return
}

function Workers() {
    return
}

function Dues() {
    return
}

function Body() {
    const [tasks, addTasks] = useState([])
    const [workers, addWorker] = useState([])
    const [dues, addDues] = useState([])
    let tasksList = tasks.map((items, ind) => ( 
    <div key = { `tasks_${ind}` } > { items } </div>
    ))
    let workerList = workers.map((items, ind) => ( 
    <div key = { `worker_${ind}` } > { items } </div>
    ))
    let duesList = dues.map((items, ind) => ( 
    <div key = { `dues_${ind}` } > { items } </div>
    ))
    return ( <>

        <h2> tasks </h2> 
        <input type = 'textarea' > </input> 
        <Tasks />
        <h2> workers </h2> 
        <Workers />
        <h2> dues </h2> 
        <Dues />
        </>)
    }



    export default function App() {
        return ( <>
            <h1> Task Manager </h1> <Body />
            </>
        );
    }