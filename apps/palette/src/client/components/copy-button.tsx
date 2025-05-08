import { type ButtonProps, IconButton, useClipboard } from "@chakra-ui/react";
import { Tooltip } from "@saas-ui/react";

import { FiCheck, FiCopy } from "react-icons/fi";

interface CopyButtonProps extends ButtonProps {
	code: string;
}

function CopyButton({ code, ...props }: CopyButtonProps) {
	const { hasCopied, onCopy } = useClipboard(code);

	const label = hasCopied ? "Copied" : "Copy";

	return (
		<Tooltip content={label}>
			<IconButton
				size="sm"
				position="absolute"
				color="white"
				fontSize="sm"
				height="24px"
				top={0}
				zIndex="1"
				right="1.25em"
				variant="ghost"
				_hover={{ bg: "none" }}
				{...props}
				aria-label="copy"
				onClick={onCopy}
			>
				{hasCopied ? <FiCheck /> : <FiCopy />}
			</IconButton>
		</Tooltip>
	);
}

export default CopyButton;
