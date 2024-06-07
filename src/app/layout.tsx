import type { Metadata } from "next";
import Footer from "@/components/footer";
import "./globals.css";


export const metadata: Metadata = {
    title: "Shorty",
    description: "'The' URL shortener.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <html lang="en">
        <body className="bg-gradient-to-r from-slate-950 to-black">
			{children}
			<Footer />
        </body>
      </html>
    );
}
