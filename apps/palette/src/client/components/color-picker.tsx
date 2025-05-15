import { ColorPicker } from "@chakra-ui/react";
import type { InputProps } from "@saas-ui/react";
import { useEffect, useId, useState } from "react";

interface ColorPickerProps extends Omit<InputProps, "onChange"> {
	onChange: (value: string) => void;
}

export default function CustomColorPicker({
	onChange,
	...props
}: ColorPickerProps) {
	const id = useId();

	const [inputValue, setInputValue] = useState<string>(props.value as string);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onChange?.(inputValue);
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [inputValue]);

	return (
		<ColorPicker.Root>
			<ColorPicker.HiddenInput />
			<ColorPicker.Label />
			<ColorPicker.Control>
				<ColorPicker.Input />
				<ColorPicker.Trigger />
			</ColorPicker.Control>
			<ColorPicker.Positioner>
				<ColorPicker.Content>
					<ColorPicker.Area />
					<ColorPicker.EyeDropper />
					<ColorPicker.Sliders />
					<ColorPicker.SwatchGroup></ColorPicker.SwatchGroup>
				</ColorPicker.Content>
			</ColorPicker.Positioner>
		</ColorPicker.Root>
	);
}
