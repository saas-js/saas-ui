import { colors } from "@saas-ui/react/colors";
import chroma, { type Color } from "chroma-js";

const names: Record<number, string> = {
	0: "red",
	30: "orange",
	40: "amber",
	50: "yellow",
	90: "lime",
	150: "green",
	160: "emerald",
	180: "teal",
	200: "cyan",
	230: "sky",
	250: "blue",
	270: "indigo",
	290: "violet",
	300: "purple",
	320: "fuchsia",
	340: "pink",
	350: "rose",
	360: "stone",
	370: "neutral",
	380: "zinc",
};

const hueName = (h: number) => {
	const i = Math.round((h - 2) / 10) * 10;
	const name = names[i];
	return name;
};

export interface PaletteColors {
	[index: string]: string;
}

function parseOklchString(str: string) {
	const match = str.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/);
	if (!match) throw new Error("Invalid OKLCH string");
	const [, l, c, h] = match.map(Number);
	return chroma.oklch(l, c, h);
}

const getLumsFromThemeColors = (name: string) => {
	const lums = [];
	let color = colors[name as keyof typeof colors];

	if (!color) {
		color = colors.red; // fallback lums from red, @todo select lums based on hue range.
	}

	// console.log("chroma", chroma);

	for (const lum in color) {
		// console.log(
		// 	"color[lum as keyof typeof color].value",
		// 	color[lum as keyof typeof color].value,
		// );
		const oklch = parseOklchString(color[lum as keyof typeof color].value);
		// console.log("oklch", {
		// 	oklch,
		// 	str: color[lum as keyof typeof color].value,
		// });
		const hex = chroma(oklch).hex();
		// console.log("hex", hex);
		const luminance = chroma(hex).luminance();
		// console.log("luminance", luminance);
		lums.push(luminance);
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
		const color = chroma(hex).luminance(lum);
		return color.hex();
		// const [l, c, h] = color.oklch();
		// return `oklch(${l}% ${c} ${h})`;
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
		"950",
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
	const start = performance.now();
	const colors = options.colors || {};
	const color = chroma(hex);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const palette: any = {};
	const [hue, sat, lte] = color.hsl();

	const hues = createHues(36)(hue); // 36 so we have steps of 10s

	const gray = colors.gray || color.hex();

	palette.black = createBlack(gray, options.blackLuminance);
	palette.gray = mapValues(createShades(gray, getLumsFromThemeColors("gray")));

	// console.log("hues", hues);

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

		// console.log("name", name);

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

	const end = performance.now();
	console.log(`createPalette took ${end - start}ms`);

	console.log("palette", palette);

	return Object.assign(palette);
};
