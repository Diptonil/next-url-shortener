"use client";

import { Navbar } from "@/components/navbar";
import { useState } from "react";


export default function Home() {
	const [url, setUrl] = useState("");
	const [link, setLink] = useState("");

	async function convert(e: React.MouseEvent) {
		e.preventDefault();
		const data = await fetch("api/link", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({"data": url})
		});
		const link = (await data.json()).data.link;		
		setLink(link);
	}

    return (
        <main className="min-h-screen">
			<Navbar />
			<div className="flex items-center justify-center min-h-[calc(100vh-64px)]"> {/* Adjust min-h based on the navbar height */}
				<div className="mb-6 justify-center items-center flex flex-col">
				<label className="block mb-2 text-sm font-medium text-gray-300">Link</label>
				<input
					type="text"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="bg-transparent border border-pink-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[75vh] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-400 dark:focus:border-pink-400"
				/>
				<button onClick={convert} className="rounded-md slate-950 mt-6 bg-pink-800 px-8 py-4">Convert</button>
				{link && (
					<p className="mt-4 text-gray-300">
					Shortened Link: <a href={link} className="text-pink-500 hover:underline">{link}</a>
					</p>
				)}
				</div>
			</div>
		</main>

    );
}
