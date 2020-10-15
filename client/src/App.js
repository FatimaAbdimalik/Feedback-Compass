import React, { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage"
// import { getMessage } from "./service";

export function App() {

	return (
	<Homepage />
	)

	// const [message, setMessage] = useState("Loading test...");

	// useEffect(() => {
	// 	getMessage().then((message) => setMessage(message));
	// }, []);

	// return (
	// 	<main role="main">
	// 		<div>
	// 		<h1>Hi</h1>
	// 			<h1 className="message" data-qa="message">{message}</h1>
	// 		</div>
	// 	</main>
	// );
}

export default App;
