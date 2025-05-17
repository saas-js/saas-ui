import { createPalette } from "@saas-ui/palette";

self.onmessage = (e) => {
	const { color, options } = e.data;
	const palette = createPalette(color, options);

	postMessage({ palette });
};
