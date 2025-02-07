import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mes mots - Memori",
};

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
