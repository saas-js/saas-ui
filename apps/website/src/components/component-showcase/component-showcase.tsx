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
} from '@chakra-ui/react'
import { Button } from '@saas-ui/button'
import { Card, CardBody } from '@saas-ui/card'
import {
  Field,
  FormStep,
  StepForm,
  NextButton,
  FormStepper,
  FormLayout,
} from '@saas-ui/forms'
import { OverflowMenu } from '@saas-ui/menu'
import { Persona } from '@saas-ui/persona'
import { Property, PropertyList } from '@saas-ui/property'
import { SearchInput } from '@saas-ui/search-input'
import { Select } from '@saas-ui/select'
import { Web3Address } from '@saas-ui/web3'
import { FiCopy, FiDelete, FiPenTool } from 'react-icons/fi'
import { BackgroundGradient } from '../background-gradient'
import Section from '../marketing/section-wrapper'
import { Float } from '../motion/float'
import { useHotkeys } from '@saas-ui/hotkeys'
import { FaGithub } from 'react-icons/fa'
import { DataTable, Column } from '@saas-ui/data-table'
import { useScrollSpy } from '@/hooks/use-scrollspy'
import { StepperCompleted } from '@saas-ui/react'

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

  useHotkeys('/', () => searchRef.current?.focus())

  // make sure the menu doesnt steel focus on load
  const isOpen = !!useScrollSpy(['#showcase-property-list'])

  const menuStyles = {
    bg: useColorModeValue('whiteAlpha.600', 'blackAlpha.500'),
    borderWidth: '1px',
    backdropFilter: 'blur(5px)',
    fontSize: 'md',
    zIndex: 2,
  }

  const cardStyles = {
    borderWidth: useColorModeValue(0, '1px'),
    fontSize: 'md',
  }

  const columns: Column<Data>[] = [
    {
      accessor: 'amount',
      width: '10%',
      Header: 'Amount',
    },
    {
      accessor: 'name',
      Header: 'Name',
    },
    {
      id: 'actions',
      width: '10%',
      // disableSortBy: true,
      Header: '',
      Cell: () => {
        const menuStyles = {
          bg: useColorModeValue('whiteAlpha.600', 'blackAlpha.500'),
          borderWidth: '1px',
          backdropFilter: 'blur(5px)',
          fontSize: 'md',
          zIndex: 2,
        }
        return (
          <OverflowMenu menuListProps={menuStyles} flip={false}>
            <MenuItem command="D" icon={<FiCopy />}>
              Duplicate
            </MenuItem>
            <MenuItem command="R" icon={<FiPenTool />}>
              Rename
            </MenuItem>
            <MenuDivider />
            <MenuItem command="⌘ ⌫" icon={<FiDelete />}>
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
      amount: '30+',
      name: 'Open Source Components',
    },
  ]

  return (
    <Section
      position="relative"
      innerWidth="container.2xl"
      height="480px"
      overflow="hidden"
    >
      <BackgroundGradient
        height="2000px"
        opacity={useColorModeValue(0.2, 0.2)}
      />
      <Box position="relative" my="6">
        <HStack position="relative">
          <Float
            position="absolute"
            top="100px"
            left="0px"
            steps={[2, 8, -4]}
            zIndex="2"
          >
            <Card {...cardStyles}>
              <DataTable<Data>
                columns={columns}
                data={data}
                isSelectable
                isSortable
                initialState={{
                  selectedRowIds: { '0': true },
                }}
                sx={{
                  th: {
                    borderBottomColor: useColorModeValue(
                      'blackAlpha.200',
                      'whiteAlpha.300'
                    ),
                  },
                  td: {
                    borderBottom: 0,
                  },
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
                          autoComplete="off"
                        />
                        <NextButton />
                      </FormLayout>
                    </FormStep>
                    <StepperCompleted>Completed!</StepperCompleted>
                  </FormStepper>
                </StepForm>
              </CardBody>
            </Card>
          </Float>

          <Float delay={2} position="absolute" left="860px" top="30px">
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
                            value="Open"
                            menuListProps={menuStyles}
                            size="sm"
                            defaultIsOpen
                            isOpen={isOpen}
                            flip={false}
                            autoSelect={false}
                          >
                            <MenuItemOption value="Open">Open</MenuItemOption>
                            <MenuItemOption value="Closed">
                              Closed
                            </MenuItemOption>
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
            <Card
              title="Github"
              avatar={<FaGithub />}
              minW="300px"
              action={
                <>
                  <Button variant="subtle" colorScheme="green">
                    Enabled
                  </Button>
                  <OverflowMenu menuListProps={menuStyles} flip={false}>
                    <MenuItem>Settings</MenuItem>
                  </OverflowMenu>
                </>
              }
              {...cardStyles}
            ></Card>
          </Float>
        </HStack>
      </Box>
    </Section>
  )
}
