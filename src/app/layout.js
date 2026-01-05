import { Geist, Geist_Mono } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.css";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "HRMS Portal",
	description: "Enterprise HR Management System (Demo UI)",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
					crossOrigin="anonymous"
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
