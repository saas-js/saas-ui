"use client";

import { useMemo } from "react";

import PaletteConfiguration from "@/components/configuration";
import Layout from "@/components/layout";
import Page from "@/components/page";
import { Preview } from "@/components/preview";
import {
	EditorProvider,
	type UseEditorReturn,
	useEditor,
} from "@/providers/editor";
import {
	Box,
	Button,
	Drawer,
	HStack,
	useBreakpointValue,
	useDisclosure,
} from "@saas-ui/react";
import { FiSliders } from "react-icons/fi";

export default function ColorsPage() {
	const [state, setState] = useEditor();

	const ctx = useMemo<UseEditorReturn>(
		() => [state, setState],
		[state, setState],
	);

	const isMobile = useBreakpointValue({ base: true, lg: false });
	const { open, onOpen, onClose, onToggle } = useDisclosure();

	return (
		<EditorProvider value={ctx}>
			<Layout>
				<HStack alignItems="flex-start">
					<Page
						title="Color palette generator"
						description="Quickly generate custom color palettes for Chakra UI."
					>
						{isMobile && (
							<Button onClick={onToggle} mb="8">
								<FiSliders /> Configure
							</Button>
						)}
						<Preview />
					</Page>
					{isMobile ? (
						<>
							<Drawer.Root
								isOpen={open}
								// placement="right"
								onClose={onClose}
							>
								<Drawer.Content>
									<Drawer.CloseButton />
									<Drawer.Body pt="8">
										<PaletteConfiguration />
									</Drawer.Body>
								</Drawer.Content>
							</Drawer.Root>
						</>
					) : (
						<Box
							width="30%"
							maxW="320px"
							borderLeftWidth="1px"
							top="0"
							position="sticky"
							height="100vh"
							overflowY="auto"
							py="4"
							px="4"
						>
							<PaletteConfiguration />
						</Box>
					)}
				</HStack>
			</Layout>
		</EditorProvider>
	);
}
