import React, { useEffect, useState } from "react";

import "./App.css";
import { getMessage } from "./service";

export function App() {
	const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		getMessage().then((message) => setMessage(message));
	}, []);

	return (
		<main role="main">
			<div>
				<h1 className="message" data-qa="message">{message}</h1>
			</div>
		</main>
	);
}

export default App;
