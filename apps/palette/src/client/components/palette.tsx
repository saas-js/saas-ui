import type React from "react";

import {
	Box,
	Flex,
	type FlexProps,
	type GridProps,
	SimpleGrid,
	Stack,
	Text,
	useClipboard,
} from "@chakra-ui/react";
import { toast } from "@saas-ui/react";
import { colors } from "@saas-ui/react/colors";
import chroma from "chroma-js";

type ColorPaletteProps = FlexProps & { color: string; name?: string };

export const ColorName = (props: FlexProps) => {
	const { children, ...rest } = props;
	return (
		<Flex
			flex="1"
			height="3rem"
			alignItems="center"
			color="muted"
			fontSize="sm"
			{...rest}
		>
			<Box>{children}</Box>
		</Flex>
	);
};

export const ColorPalette = (props: ColorPaletteProps) => {
	const { color, name, ...rest } = props;

	// const system = useSystem()
	const system = { colors };
	console.log("system", system);

	let colorCode = color;
	const [hue, shade] = color.split(".");

	if (shade && hue) {
		colorCode = system.colors?.[hue]?.value?.[shade];
	}

	if (
		color in system.colors &&
		typeof system.colors?.[color]?.value === "string"
	) {
		colorCode = system.colors?.[color]?.value;
	}

	const { onCopy } = useClipboard(colorCode);

	const lightContrast =
		Math.round(chroma.contrast(colorCode, system.colors.white.value) * 100) /
		100;
	const darkContrast =
		Math.round(chroma.contrast(colorCode, system.colors.black.value) * 100) /
		100;

	const textColor = lightContrast < 4.5 ? "black" : "white";
	const contrast = lightContrast < 4.5 ? darkContrast : lightContrast;

	return (
		<Flex flex="1" position="relative" {...rest}>
			<Flex
				height="3rem"
				flex="1"
				boxShadow="inner"
				bg={color}
				color={textColor}
				fontSize="sm"
				overflow="hidden"
				css={{
					position: "absolute",
					width: "100%",
					cursor: "pointer",
					transitionProperty: "width, height",
					transitionDuration: "normal",
					"& > div": {
						opacity: 0,
					},
					_hover: {
						zIndex: 2,
						position: "absolute",
						top: "50%",
						left: "50%",
						width: "calc(100% + 3rem)",
						height: "calc(100% + 3rem)",
						transform: "translate(-50%, -50%)",
						boxShadow: "lg",
						borderRadius: "sm",
						"& > div": {
							opacity: 1,
						},
					},
				}}
				onClick={() => {
					toast.info(`Copied ${colorCode}`);
					onCopy();
				}}
			>
				<Stack width="100%" textAlign="center" p="4">
					<Flex justifyContent="center" flex="1">
						<Text fontWeight="semibold">{colorCode}</Text>
					</Flex>
					<Flex>
						<Text opacity="0.4" flex="1">
							WCAG 2:{" "}
						</Text>
						<Text>{contrast}</Text>
					</Flex>
				</Stack>
			</Flex>
		</Flex>
	);
};

export const ColorPalettes = (props: { color: string; name: string }) => {
	const { color, name } = props;
	// const system = useSystem()
	const system = { colors };
	const keys = Object.keys(system.colors?.[color]?.value);

	return (
		<>
			<ColorName>{name || color}</ColorName>
			{keys.map((item) => (
				<ColorPalette
					key={`${color}.${item}`}
					color={`${color}.${item}`}
					name={`${color} ${item}`}
				/>
			))}
		</>
	);
};

export const ColorWrapper: React.FC<GridProps> = (props) => (
	<SimpleGrid columns={11} {...props} spacing="0" />
);
