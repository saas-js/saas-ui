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
} from '@chakra-ui/react'
import { Button } from '@saas-ui/button'
import { Card, CardBody, CardFooter } from '@saas-ui/card'
import {
  Field,
  Form,
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
import { Stepper, StepperStep } from '@saas-ui/stepper'
import { Web3Address } from '@saas-ui/web3'
import { FiCopy, FiDelete, FiPenTool } from 'react-icons/fi'
import { BackgroundGradient } from '../background-gradient'
import Section from '../marketing/section-wrapper'
import { Float } from '../motion/float'
import { useHotkeys } from '@saas-ui/hotkeys'
import { FaGithub } from 'react-icons/fa'
import { DataTable, Column } from '@saas-ui/data-table'

import { DataGrid } from '@saas-ui/pro'

interface Data {
  id: string
  name: string
  email: string
}

export const ComponentShowcase = () => {
  const searchRef = React.useRef<HTMLInputElement>(null)

  useHotkeys('/', () => searchRef.current?.focus())

  const menuStyles = {
    bg: useColorModeValue('whiteAlpha.600', 'blackAlpha.500'),
    borderWidth: '1px',
    backdropFilter: 'blur(5px)',
    fontSize: 'md',
    zIndex: 2,
  }

  const columns: Column<Data>[] = [
    {
      accessor: 'name',
      Header: 'Name',
    },
    {
      accessor: 'email',
      Header: 'Email',
    },
    {
      id: 'actions',
      width: 10,
      disableSortBy: true,
      Header: '',
      Cell: () => {
        return (
          <OverflowMenu menuListProps={menuStyles}>
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
      name: 'Eelco',
      email: 'hello@saas-ui.dev',
    },
  ]

  return (
    <Section
      position="relative"
      innerWidth="container.2xl"
      height="440px"
      overflow="hidden"
    >
      <BackgroundGradient
        height="2000px"
        opacity={useColorModeValue(0.4, 0.2)}
      />
      <HStack position="relative">
        <Float
          position="absolute"
          top="100px"
          left="0px"
          steps={[2, 8, -4]}
          zIndex="2"
        >
          <Card fontSize="md">
            <DataGrid<Data>
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
            name="Eelco Wiersma"
            presence="online"
            secondaryLabel="Founder"
            tertiaryLabel="Out for lunch"
          />
        </Float>

        <Float delay={0} position="absolute" left="200px" top="30px">
          <SearchInput
            ref={searchRef}
            width="260px"
            borderColor={useColorModeValue('whiteAlpha.700', 'whiteAlpha.400')}
            color="white"
            rightElement={
              <Kbd
                fontSize="lg"
                fontWeight="bold"
                bg={useColorModeValue('whiteAlpha.100', 'blackAlpha.300')}
                color="white"
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
            colorScheme={useColorModeValue('white', 'cyan')}
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
          <Card width="320px">
            <CardBody>
              <StepForm onSubmit={async () => null}>
                <FormStepper orientation="vertical">
                  <FormStep name="info" title="Personal information">
                    <FormLayout>
                      <Field name="name" label="Name" />
                      <NextButton />
                    </FormLayout>
                  </FormStep>
                  <FormStep name="account" title="Account" />
                  <FormStep name="confirm" title="Confirmation" />
                </FormStepper>
              </StepForm>
            </CardBody>
          </Card>
        </Float>

        <Float delay={2} position="absolute" left="860px" top="30px">
          <Card width="320px">
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
                          isOpen
                        >
                          <MenuItemOption value="Open">Open</MenuItemOption>
                          <MenuItemOption value="Closed">Closed</MenuItemOption>
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
                <OverflowMenu menuListProps={menuStyles}>
                  <MenuItem>Settings</MenuItem>
                </OverflowMenu>
              </>
            }
          ></Card>
        </Float>
      </HStack>
    </Section>
  )
}
