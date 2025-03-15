import * as React from 'react'

import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Kbd,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  DarkMode,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Tag,
} from '@chakra-ui/react'
import {
  Field,
  FormStep,
  StepForm,
  NextButton,
  FormStepper,
  FormLayout,
  Select,
  SelectButton,
  SelectList,
} from '@saas-ui/forms'
import { FiCopy, FiDelete, FiPenTool } from 'react-icons/fi'
import { BackgroundGradient } from '../background-gradient'
import Section from '../marketing/section-wrapper'
import { Float } from '../motion/float'
import { FaGithub } from 'react-icons/fa'
import { useScrollSpy } from '@/hooks/use-scrollspy'
import {
  StepsCompleted,
  OverflowMenu,
  Persona,
  Property,
  PropertyList,
  SearchInput,
  Web3Address,
  DataTable,
  useHotkeys,
} from '@saas-ui/react'

import confetti from 'canvas-confetti'

const showConfetti = async () => {
  confetti({
    zIndex: 999,
    particleCount: 100,
    spread: 100,
  })
}

interface Data {
  id: string
  amount: string
  name: string
}

export const ComponentShowcase = () => {
  const searchRef = React.useRef<HTMLInputElement>(null)

  // useHotkeys('/', () => searchRef.current?.focus())

  // make sure the menu doesnt steel focus on load
  const isOpen = !!useScrollSpy(['#showcase-property-list'])

  const menuStyles = {
    bg: useColorModeValue('whiteAlpha.600', 'blackAlpha.500'),
    borderWidth: '1px',
    backdropFilter: 'blur(5px)',
    fontSize: 'md',
    zIndex: 2,
  }

  const menuItemStyles = {
    bg: 'transparent',
    _hover: {
      bg: 'blackAlpha.50',
      _dark: { bg: 'whiteAlpha.50' },
    },
  }

  const cardStyles = {
    borderWidth: useColorModeValue(0, '1px'),
    fontSize: 'md',
  }

  const columns: any[] = [
    {
      accessorKey: 'amount',
      size: 10,
      header: 'Amount',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      id: 'actions',
      size: 10,
      disableSortBy: true,
      header: '',
      cell: () => {
        const menuStyles = {
          bg: 'whiteAlpha.600',
          _dark: {
            bg: 'blackAlpha.500',
          },
          borderWidth: '1px',
          backdropFilter: 'blur(5px)',
          fontSize: 'md',
          zIndex: 2,
        }
        return (
          <OverflowMenu menuListProps={menuStyles} flip={false}>
            <MenuItem command="D" icon={<FiCopy />} sx={menuItemStyles}>
              Duplicate
            </MenuItem>
            <MenuItem command="R" icon={<FiPenTool />} sx={menuItemStyles}>
              Rename
            </MenuItem>
            <MenuDivider />
            <MenuItem command="⌘ ⌫" icon={<FiDelete />} sx={menuItemStyles}>
              Delete
            </MenuItem>
          </OverflowMenu>
        )
      },
    },
  ]

  const data: Data[] = [
    {
      id: '1',
      amount: '40+',
      name: 'Open Source Components',
    },
  ]

  return (
    <Section
      position="relative"
      innerWidth="container.2xl"
      height="500px"
      overflow="hidden"
    >
      <BackgroundGradient
        height="2000px"
        opacity={useColorModeValue(0.2, 0.2)}
      />
      <Box position="relative" my="6">
        <HStack position="relative" transform="translateX(50px)">
          <Float
            position="absolute"
            top="100px"
            left="0px"
            steps={[2, 8, -4]}
            zIndex="2"
          >
            <Card {...cardStyles}>
              <DataTable
                columns={columns}
                data={data}
                isSelectable
                isSortable
                initialState={{
                  rowSelection: { 0: true },
                }}
              />
            </Card>
          </Float>

          <Float
            delay={0.4}
            steps={[-8, 10, -4]}
            position="absolute"
            top="-40px"
            left="20px"
          >
            <Persona
              name="Renata Alink"
              presence="online"
              secondaryLabel="Founder"
              src="/showcase-avatar.jpg"
            />
          </Float>

          <Float delay={0} position="absolute" left="180px" top="30px">
            <SearchInput
              ref={searchRef}
              width="260px"
              borderColor={useColorModeValue(
                'blackAlpha.300',
                'whiteAlpha.400'
              )}
              color="white"
              bg={useColorModeValue('white', 'whiteAlpha.50')}
              rightElement={
                <Kbd
                  fontSize="lg"
                  fontWeight="bold"
                  bg={useColorModeValue('blackAlpha.50', 'blackAlpha.300')}
                >
                  /
                </Kbd>
              }
            />
          </Float>

          <Float
            delay={0.7}
            position="absolute"
            left="880px"
            top="-40px"
            steps={[0, 6, -8]}
          >
            <Button
              variant="outline"
              colorScheme={useColorModeValue('purple', 'cyan')}
              _hover={{
                bg: useColorModeValue('whiteAlpha.400', 'blackAlpha.300'),
              }}
            >
              <Web3Address address="0x881306428e1bB358d2EdC68bE7008331A01D90A6" />
            </Button>
          </Float>

          <Float
            delay={2}
            position="absolute"
            left="500px"
            top="-50px"
            steps={[-5, 10, -10]}
          >
            <Card width="320px" {...cardStyles}>
              <CardBody>
                <StepForm onSubmit={showConfetti}>
                  <FormStepper orientation="vertical">
                    <FormStep name="info" title="Personal information">
                      <FormLayout>
                        <Field name="name" label="Name" />
                        <NextButton />
                      </FormLayout>
                    </FormStep>
                    <FormStep name="account" title="Account">
                      <FormLayout>
                        <Field name="email" label="Email" type="email" />
                        <Field
                          name="password"
                          label="Password"
                          type="password"
                          // autoComplete="off"
                        />
                        <NextButton />
                      </FormLayout>
                    </FormStep>
                    <StepsCompleted>Completed!</StepsCompleted>
                  </FormStepper>
                </StepForm>
              </CardBody>
            </Card>
          </Float>

          <Float delay={2} position="absolute" left="920px" top="80px">
            <Card width="320px" {...cardStyles} id="showcase-property-list">
              <Tabs colorScheme="purple">
                <TabList>
                  <Tab>Details</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <PropertyList fontSize="md">
                      <Property
                        label="Name"
                        value={
                          <Editable defaultValue="Saas UI">
                            <EditablePreview />
                            <EditableInput />
                          </Editable>
                        }
                      />
                      <Property
                        label="Status"
                        value={
                          <Select
                            name="status"
                            value="Open"
                            size="sm"
                            defaultIsOpen
                            isOpen={isOpen}
                            flip={false}
                            autoSelect={false}
                          >
                            <SelectButton />
                            <SelectList>
                              <MenuItemOption value="Open" sx={menuItemStyles}>
                                Open
                              </MenuItemOption>
                              <MenuItemOption
                                value="Closed"
                                sx={menuItemStyles}
                              >
                                Closed
                              </MenuItemOption>
                            </SelectList>
                          </Select>
                        }
                      />
                    </PropertyList>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Card>
          </Float>

          <Float position="absolute" left="1080px" top="-60px">
            <Card minW="300px" {...cardStyles}>
              <HStack py="2" px="4">
                <FaGithub />
                <Heading size="sm" fontWeight="medium" flex="1">
                  Github
                </Heading>
                <Tag variant="subtle" colorScheme="green" rounded="full" px="4">
                  Enabled
                </Tag>
                <OverflowMenu
                  menuListProps={menuStyles}
                  flip={false}
                  placement="bottom-end"
                >
                  <MenuItem sx={menuItemStyles}>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem sx={menuItemStyles}>Disconnect</MenuItem>
                </OverflowMenu>
              </HStack>
            </Card>
          </Float>
        </HStack>
      </Box>
    </Section>
  )
}
