import { colors } from "@saas-ui/react/colors";
import chroma, { type Color } from "chroma-js";

const names: Record<number, string> = {
	0: "red",
	30: "orange",
	50: "yellow",
	150: "green",
	180: "teal",
	190: "cyan",
	210: "blue",
	260: "purple",
	330: "pink",
};

const hueName = (h: number) => {
	const i = Math.round((h - 2) / 10) * 10;
	const name = names[i];
	return name;
};

export interface PaletteColors {
	[index: string]: string;
}

const getLumsFromThemeColors = (name: string) => {
	const lums = [];
	let color = colors[name as keyof typeof colors];

	if (!color) {
		color = colors.red; // fallback lums from red, @todo select lums based on hue range.
	}

	console.log("chroma", chroma);

	for (const lum in color) {
		lums.push(chroma.hex(color[lum as keyof typeof color]).luminance());
	}

	return lums;
};

const createArray = (length: number) => {
	const arr = [];
	for (let i = 0; i < length; i++) {
		arr.push(i);
	}
	return arr;
};

const createHues = (length: number) => {
	const hueStep = 360 / length;
	return (base: number) => {
		const hues = createArray(length).map((n) =>
			Math.floor((base + n * hueStep) % 360),
		);

		return hues;
	};
};

// const desat = (n: number) => (hex: string) => {
// 	const [h, _s, l] = chroma(hex).hsl();
// 	return chroma.hsl(h, n, l).hex();
// };

const createBlack = (hex: string, lum = 0) => {
	return chroma(hex).luminance(lum).hex();
};

const createShades = (hex: string, lums: Array<number>) => {
	return lums.map((lum) => {
		return chroma(hex).luminance(lum).hex();
	});
};

const getColorName = (hex: Color) => {
	const [hue] = chroma(hex).hsl();
	const name = hueName(hue);
	return name;
};

const mapValues = (values: Array<string>) => {
	const keys = [
		"50",
		"100",
		"200",
		"300",
		"400",
		"500",
		"600",
		"700",
		"800",
		"900",
	];
	const obj: Record<string, string> = {};

	for (const key in values) {
		obj[keys[key]] = values[key];
	}

	return obj;
};

export interface PaletteOptions {
	blackLuminance?: number;
	colors?: PaletteColors;
}

export const createPalette = (hex: string, options: PaletteOptions = {}) => {
	const colors = options.colors || {};
	const color = chroma(hex);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const palette: any = {};
	const [hue, sat, lte] = color.hsl();

	const hues = createHues(36)(hue); // 36 so we have steps of 10

	const gray = colors.gray || color.hex();

	palette.black = createBlack(gray, options.blackLuminance);
	palette.gray = mapValues(createShades(gray, getLumsFromThemeColors("gray")));

	// biome-ignore lint/complexity/noForEach: <explanation>
	hues.forEach((h) => {
		let c = chroma.hsl(h, sat, lte);
		const name = getColorName(c);

		if (!name) {
			return;
		}

		// override the hex value if this color has a custom value.
		if (colors[name]) {
			c = chroma.hex(colors[name]);
		}

		palette[name] = mapValues(
			createShades(c.hex(), getLumsFromThemeColors(name)),
		);
	});

	// Create shades for custom colors.
	// biome-ignore lint/complexity/noForEach: <explanation>
	Object.entries(colors).forEach(([name, value]) => {
		if (!palette[name]) {
			const c = chroma(value);
			palette[name] = mapValues(
				createShades(c.hex(), getLumsFromThemeColors(name)),
			);
		}
	});

	return Object.assign(palette);
};
