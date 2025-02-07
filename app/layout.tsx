import { APIProvider } from "@/contexts/API";
import { DataProvider } from "@/contexts/Data";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: "Quiz - Memori",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<DataProvider>
				<APIProvider>
					<body
						className={`${inter.className} antialiased dark w-dvw h-dvh`}>
						<Header />
						{children}
					</body>
				</APIProvider>
			</DataProvider>
		</html>
	);
}
