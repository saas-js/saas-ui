import Providers from "@/providers/providers";
// import '@fontsource/inter/variable.css'

// const themes: Record<string, any> = {
//   'Chakra UI': baseTheme,
//   'Saas UI': saasTheme,
//   Glass: glassTheme,
// }

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
