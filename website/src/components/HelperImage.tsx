import { Box } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import Image from "next/image";

type HelperImageProps = {
  label?: string;
  src: string;
};

const HelperImage = ({ label, src }: HelperImageProps) => {
  return (
    <Tooltip hasArrow aria-label={label} label={label} placement="auto-end">
      <Box marginX={2}>
        <Image src={src} alt={label} title={label} height={33} width={33} />
      </Box>
    </Tooltip>
  );
};

export default HelperImage;
