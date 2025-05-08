import {
	Badge,
	Button,
	HStack,
	Spinner,
	type SpinnerProps,
	VStack,
} from "@chakra-ui/react";
import { Checkbox, Radio, RadioGroup, Switch } from "@saas-ui/react";

const StyledSpinner = ({ colorScheme }: SpinnerProps) => {
	return (
		<Spinner
			color={{
				base: `${colorScheme}.500`,
				_dark: `${colorScheme}.500`,
			}}
		/>
	);
};

const ComponentPreview = () => {
	const colors = [
		"gray",
		"red",
		"green",
		"blue",
		"teal",
		"pink",
		"purple",
		"cyan",
		"orange",
		"yellow",
	];
	return (
		<>
			<VStack gap="8" alignItems="stretch">
				<HStack>
					{colors.map((colorScheme) => (
						<Button key={colorScheme} colorScheme={colorScheme} variant="solid">
							{colorScheme}
						</Button>
					))}
				</HStack>
				<HStack>
					{colors.map((colorScheme) => (
						<Button
							key={colorScheme}
							colorScheme={colorScheme}
							variant="outline"
						>
							{colorScheme}
						</Button>
					))}
				</HStack>
				<HStack>
					{colors.map((colorScheme) => (
						<Button key={colorScheme} colorScheme={colorScheme} variant="ghost">
							{colorScheme}
						</Button>
					))}
				</HStack>
				<HStack>
					{colors.map((colorScheme) => (
						<Button
							key={colorScheme}
							colorScheme={colorScheme}
							variant="subtle"
						>
							{colorScheme}
						</Button>
					))}
				</HStack>
				<HStack>
					{colors.map((colorScheme) => (
						<Badge key={colorScheme} colorScheme={colorScheme} variant="solid">
							{colorScheme}
						</Badge>
					))}
				</HStack>
				<HStack>
					{colors.map((colorScheme) => (
						<Badge key={colorScheme} colorScheme={colorScheme} mr={2}>
							{colorScheme}
						</Badge>
					))}
				</HStack>
				<HStack>
					{colors.map((colorScheme) => (
						<Badge
							key={colorScheme}
							colorScheme={colorScheme}
							variant="outline"
						>
							{colorScheme}
						</Badge>
					))}
				</HStack>
				<HStack>
					{colors.map((colorScheme) => (
						<StyledSpinner key={colorScheme} colorScheme={colorScheme} />
					))}
				</HStack>
				<HStack>
					<Switch isChecked />

					<RadioGroup>
						<Radio />
					</RadioGroup>

					<Checkbox checked />
				</HStack>
			</VStack>
		</>
	);
};

export default ComponentPreview;
