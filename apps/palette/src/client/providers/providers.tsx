"use client";

import { Toaster } from "@saas-ui/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import PaletteProvider from "./palette";
import ThemeProvider from "./theme";

export default function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<PaletteProvider
			color="#6d28d9"
			options={{
				blackLuminance: 0.005,
				colors: { gray: "#1f2937" },
				theme: "Saas UI",
			}}
		>
			<ThemeProvider>
				<NextThemeProvider attribute="class" disableTransitionOnChange>
					{children}
					<Toaster />
				</NextThemeProvider>
			</ThemeProvider>
		</PaletteProvider>
	);
}
