"use client";

import React, { type PropsWithChildren, createContext } from "react";

import {
	SuiProvider,
	createSystem,
	defaultConfig,
	defaultSystem,
	defineConfig,
} from "@saas-ui/react";

import { usePalette } from "./palette";

const SystemContext = createContext<typeof defaultSystem>(defaultSystem);

export function useSystem() {
	return React.useContext(SystemContext);
}

export default function ThemeProvider({ children }: PropsWithChildren) {
	const [{ colors, options }] = usePalette();

	const system = React.useMemo(() => {
		const config = defineConfig({
			theme: {
				tokens: {
					colors,
				},
			},
		});

		return createSystem(defaultConfig, config);
	}, [colors]);

	return (
		<SuiProvider value={system}>
			<SystemContext.Provider value={system}>{children}</SystemContext.Provider>
		</SuiProvider>
	);
}
