"use client";

import React, { createContext, type PropsWithChildren } from "react";

import {
	defaultSystem,
	type SystemContext as ISystemContext,
} from "@chakra-ui/react";
import { SuiProvider, createSystem, defineConfig } from "@saas-ui/react";
import { usePalette } from "./palette";

const SystemContext = createContext<ISystemContext>(defaultSystem);

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

		return createSystem(defaultSystem, config);
	}, [colors]);

	return (
		<SuiProvider value={system}>
			<SystemContext.Provider value={system}>{children}</SystemContext.Provider>
		</SuiProvider>
	);
}
