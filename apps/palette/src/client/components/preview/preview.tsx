import { Badge, Tabs } from "@saas-ui/react";
import CodePreview from "./code";
import ComponentPreview from "./components";
import FigmaPreview from "./figma";
import JsonPreview from "./json";
import PalettePreview from "./palette";

export const Preview = () => {
	return (
		<Tabs.Root colorScheme="primary" variant="enclosed">
			<Tabs.List mb="4">
				<Tabs.Tab>Colors</Tabs.Tab>
				<Tabs.Tab>Components</Tabs.Tab>
				<Tabs.Tab>Code</Tabs.Tab>
				<Tabs.Tab>JSON</Tabs.Tab>
				<Tabs.Tab>
					Figma{" "}
					<Badge bg="primary.500" fontSize="xs" ms="2">
						new
					</Badge>
				</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panels>
				<Tabs.Panel>
					<PalettePreview />
				</Tabs.Panel>
				<Tabs.Panel>
					<ComponentPreview />
				</Tabs.Panel>
				<Tabs.Panel position="relative">
					<CodePreview />
				</Tabs.Panel>
				<Tabs.Panel position="relative">
					<JsonPreview />
				</Tabs.Panel>
				<Tabs.Panel>
					<FigmaPreview />
				</Tabs.Panel>
			</Tabs.Panels>
		</Tabs.Root>
	);
};
