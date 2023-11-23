import "./App.css";
import { useState } from "react";
import Length from "./Length";
import { FaPlayCircle, FaPauseCircle, FaCircleNotch } from "react-icons/fa";

function App() {
	const [displayTime, setDisplayTime] = useState(25 * 60);
	const [breakTime, setBreakTime] = useState(5 * 60);
	const [sessionTime, setSessionTime] = useState(25 * 60);
	const [timerOn, setTimerOn] = useState(false);
	const [onBreak, setOnBreak] = useState(false);
	const [breakAudio, setBreakAudio] = useState(new Audio("./breakTime.mp3"));

	const playBreakSound = () => {
		breakAudio.currentTime = 0;
		setBreakAudio(breakAudio);
		breakAudio.play();
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return (
			(minutes < 10 ? "0" + minutes : minutes) +
			":" +
			(seconds < 10 ? "0" + seconds : seconds)
		);
	};

	const changeTime = (amount, type) => {
		if (type === "break") {
			if (breakTime <= 60 && amount < 0) {
				return;
			}
			setBreakTime((prev) => prev + amount);
		} else {
			if (sessionTime <= 60 && amount < 0) {
				return;
			}
			setSessionTime((prev) => prev + amount);
			if (!timerOn) {
				setDisplayTime(sessionTime + amount);
			}
		}
	};

	const controlTime = () => {
		let second = 1000;
		let date = new Date().getTime();
		let nextDate = new Date().getTime() + second; //set date to be 1sec in the future.
		let onBreakVariable = onBreak;
		if (!timerOn) {
			let interval = setInterval(() => {
				date = new Date().getTime();
				if (date > nextDate) {
					setDisplayTime((prev) => {
						if (prev <= 0 && !onBreakVariable) {
							playBreakSound();
							onBreakVariable = true;
							setOnBreak(true);
							return breakTime;
						} else if (prev <= 0 && onBreakVariable) {
							playBreakSound();
							onBreakVariable = false;
							setOnBreak(false);
							return sessionTime;
						}
						return prev - 1;
					});
					nextDate += second;
				}
			}, 30);

			localStorage.clear();
			localStorage.setItem("interval-id", interval); //Make the interval a global variable by storing it in the local storage
			console.log(localStorage.getItem("interval-id"));
		}
		console.log();

		if (timerOn) {
			clearInterval(30);
		}
		setTimerOn(!timerOn);
	};

	const resetTime = () => {
		setSessionTime(25 * 60);
		setBreakTime(5 * 60);
		setDisplayTime(25 * 60);
	};

	return (
		<div className="main">
			<h1 className="clock-title">Pomodoro Clock</h1>
			<div className="dual-container">
				<Length
					title={"break-time"}
					changeTime={changeTime}
					type={"break"}
					time={breakTime}
					formatTime={formatTime}
				/>
				<Length
					title={"session-time"}
					changeTime={changeTime}
					type={"session"}
					time={sessionTime}
					formatTime={formatTime}
				/>
			</div>

			<h3>{onBreak ? "break" : "session"}</h3>

			<h1>{formatTime(displayTime)}</h1>
			<div className="timer-btns">
				<button className="btn-timer" onClick={() => controlTime()}>
				{timerOn ? <FaPauseCircle /> : <FaPlayCircle />}
			</button>
			<button className="btn-reset" onClick={() => resetTime()}>
				
				<FaCircleNotch />
			</button>
			</div>
			
		</div>
	);
}

export default App;
