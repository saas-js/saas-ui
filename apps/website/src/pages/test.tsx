import { Badge, Box, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { AppShell } from '@saas-ui/react'
import {
  NavGroup,
  NavItem,
  Sidebar,
  SidebarOverlay,
  SidebarSection,
  SidebarToggleButton,
} from '@saas-ui/sidebar'
import { FiHome, FiUsers, FiSettings, FiHelpCircle } from 'react-icons/fi'

export default function Home() {
  return (
    <AppShell
      sidebar={
        <HStack spacing="0" height="100vh">
          <Sidebar
            variant="condensed"
            height="100vh"
            bg="purple.500"
            borderWidth="0"
            width="12"
          >
            <SidebarSection>
              <Image
                src="https://saas-ui.dev/favicons/favicon-96x96.png"
                boxSize="7"
              />
            </SidebarSection>
            <SidebarSection>
              <NavItem icon={<FiHome size="1.2em" color="white" />}>
                Home
              </NavItem>
              <NavItem icon={<FiUsers size="1.2em" color="white" />} isActive>
                Users
              </NavItem>
              <NavItem icon={<FiSettings size="1.2em" color="white" />}>
                Settings
              </NavItem>
            </SidebarSection>
          </Sidebar>
          <Sidebar
            height="100vh"
            //isResizable
            width="280px"
            minWidth="220px"
            maxWidth="320px"
            breakpoints={{ base: true, lg: false }}
          >
            <SidebarToggleButton />
            <SidebarSection direction="row">
              <Heading size="sm" fontWeight="semibold">
                Users
              </Heading>
            </SidebarSection>
            <SidebarSection flex="1" overflowY="auto">
              <NavGroup>
                <NavItem icon={<FiUsers />} isActive>
                  Overview
                </NavItem>
              </NavGroup>

              <NavGroup title="Teams" isCollapsible>
                <NavItem>Sales</NavItem>
                <NavItem>Support</NavItem>
              </NavGroup>

              <NavGroup title="Tags" isCollapsible>
                <NavItem
                  icon={
                    <Badge bg="purple.500" boxSize="2" borderRadius="full" />
                  }
                >
                  <Text>Lead</Text>
                  <Badge opacity="0.6" borderRadius="full" bg="none" ms="auto">
                    83
                  </Badge>
                </NavItem>
                <NavItem
                  icon={<Badge bg="cyan.500" boxSize="2" borderRadius="full" />}
                >
                  <Text>Customer</Text>
                  <Badge opacity="0.6" borderRadius="full" bg="none" ms="auto">
                    210
                  </Badge>
                </NavItem>
              </NavGroup>
            </SidebarSection>
            <SidebarSection>
              <NavItem icon={<FiHelpCircle />}>Documentation</NavItem>
            </SidebarSection>
            <SidebarOverlay />
          </Sidebar>
        </HStack>
      }
    >
      <Box></Box>
    </AppShell>
  )
}
