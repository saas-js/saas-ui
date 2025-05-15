import { useSystem } from "@/providers/theme";
import { Box, Flex, Stack, Text } from "@saas-ui/react";
// import { colors } from "@saas-ui/react/colors";
import { useMemo } from "react";
import {
	ColorName,
	ColorPalette,
	ColorPalettes,
	ColorWrapper,
} from "../palette";

const PalettePreview = () => {
	const system = useSystem();
	console.log("system", system);

	const mappedColors = useMemo(() => {
		const allColors = Object.keys(system.colors);

		const colorsToRemove = [
			"black",
			"blackAlpha",
			"current",
			"transparent",
			"white",
			"whiteAlpha",
		];
		for (const color of colorsToRemove) {
			allColors.splice(allColors.indexOf(color), 1);
		}

		return allColors;
	}, []);

	return (
		<Stack gap="4px">
			<ColorWrapper>
				{["", 50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((hue) => (
					<Flex key={hue} justifyContent="center" height="3rem">
						<Text color="muted" fontSize="sm">
							{hue}
						</Text>
					</Flex>
				))}
			</ColorWrapper>

			<ColorWrapper>
				<ColorPalettes color="primary" name="Primary" />
			</ColorWrapper>

			<Box height="3rem" />

			<ColorWrapper>
				<ColorName>Black</ColorName>
				<ColorPalette color="black" />
			</ColorWrapper>

			<Box height="3rem" />

			{mappedColors.map((color) => (
				<ColorWrapper key={color}>
					<ColorPalettes color={color} name={color} />
				</ColorWrapper>
			))}

			<Box height="3rem" />

			<ColorWrapper>
				<ColorPalettes color="blackAlpha" name="Black Alpha" />
			</ColorWrapper>
			<ColorWrapper>
				<ColorPalettes color="whiteAlpha" name="White Alpha" />
			</ColorWrapper>
		</Stack>
	);
};

export default PalettePreview;
