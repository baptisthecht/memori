"use client";
import { Word } from "@prisma/client";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useData } from "./Data";
export type APIContextType = {};

export const APIContext = createContext<APIContextType>({});

export const APIProvider = ({ children }: { children: ReactNode }) => {
	const { setWords, setLoading } = useData();

	const getWords = async () => {
		try {
			const res = await axios.get("/api/words");
			const data: Word[] = res.data;
			setWords(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getWords();
	}, []);

	return <APIContext.Provider value={{}}>{children}</APIContext.Provider>;
};

export const useAPI = () => {
	const context = useContext(APIContext);
	if (context === undefined) {
		throw new Error("useAPI must be used within a APIProvider");
	}
	return context;
};
