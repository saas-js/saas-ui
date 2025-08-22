import { Button, IconButton } from "@saas-ui/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Nav = () => {
	return (
		<>
			<Button asChild variant="ghost">
				<Link href="https://saas-ui.dev/docs">Documentation</Link>
			</Button>

			<IconButton asChild variant="ghost" aria-label="Share on Twitter">
				<Link href="https://twitter.com/intent/tweet?text=Check%20out%20this%20color%20palette%20generator%20for%20%40chakra_ui.%20Build%20by%20%40saas_js%0Ahttps%3A//palette.saas-ui.dev">
					<FaXTwitter />
				</Link>
			</IconButton>

			<IconButton asChild variant="ghost" aria-label="Star on Github">
				<Link href="https://github.com/saas-js/saas-ui">
					<FaGithub />
				</Link>
			</IconButton>
		</>
	);
};
