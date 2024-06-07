"use client";

import Navbar from "@/components/navbar";
import { useState } from "react";


export default function Home() {
	const [url, setUrl] = useState<string>("");
	const [link, setLink] = useState<string>("");
	const [copied, setCopied] = useState<boolean>(false);

	async function convert(e: React.MouseEvent) {
		e.preventDefault();
		const data = await fetch("api/link", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({"data": url})
		});
		const link = "http://localhost/go/" + (await data.json()).data.link;		
		setLink(link);
		setCopied(false);
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(link);
		setCopied(true);
		setTimeout(function () {
			setCopied(false);
		}, 3000);
	}

    return (
        <main className="min-h-screen">
			<Navbar />
			<div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
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
					<div className="mt-4 flex items-center text-gray-300">
						<span>
						Shortened Link: <a href={link} className="text-pink-500 hover:underline">{link}</a>
						</span>
						<button onClick={copyToClipboard} className="ml-2 bg-pink-500 hover:bg-pink-700 text-white text-xs px-2 py-1 rounded">Copy</button>
						{copied && <span className="ml-2 text-green-500">Copied!</span>}
				  </div>
				)}
				</div>
			</div>
		</main>
    );
}
