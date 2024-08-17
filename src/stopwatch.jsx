import React, {useState, useEffect, useRef} from "react";

function StopWatch(){
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    const intervalIDRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(()=>{
        if(isRunning){
            intervalIDRef.current = setInterval(()=>{
                setTime(Date.now() - startTimeRef.current);
            },10);
        }

        return() => {
            clearInterval(intervalIDRef.current);
        }
    },[isRunning])

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - time;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setTime(0);
        setIsRunning(false);
    }

    function formattime(){
        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor(time / (1000 * 60) % 60);
        let seconds = Math.floor(time / (1000) % 60);
        let milliseconds = Math.floor((time % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`
    }

    return(
        <div className="stopwatch-container">
            <h1 className="heading">StopWatch</h1>
            <h2 className="time">{formattime()}</h2>
            <div className="button-container">
                <button onClick={start} className="start">Start</button>
                <button onClick={stop} className="stop">Stop</button>
                <button onClick={reset} className="reset">Reset</button>
            </div>
        </div>
    );
}

export default StopWatch;