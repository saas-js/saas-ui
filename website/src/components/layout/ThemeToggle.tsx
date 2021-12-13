import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import {
  Moon,
  Sun
} from 'react-feather'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="ghost"
      aria-label="theme toggle"
      icon={colorMode === "light" ? <Moon size="18" /> : <Sun size="18" />}
      borderRadius="6"
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
