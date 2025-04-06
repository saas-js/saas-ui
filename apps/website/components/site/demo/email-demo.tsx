import {
  AppShell,
  Avatar,
  Box,
  Button,
  type ButtonProps,
  Container,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Kbd,
  Menu,
  Sidebar,
  Spacer,
  Stack,
  Text,
  Tooltip,
} from '@saas-ui/react'
import {
  RiDraftLine,
  RiEditBoxLine,
  RiEyeLine,
  RiFilter3Line,
  RiInbox2Line,
  RiPulseLine,
  RiReplyAllLine,
  RiReplyLine,
  RiSearchLine,
} from 'react-icons/ri'

import { Prose } from '../../prose.tsx'

const emailBody = String.raw`<p>Dear PiedPiper Support,</p>

<p>I hope this email finds you well and not enslaved by artificial intelligence. I'm writing because I have some concerns about your latest app update. Specifically, the AI assistant you've integrated seems to have developed a concerning fondness for world domination.</p>

<p>Here's what's been happening:</p>

<ol>
  <li>Every time I open the app, it whispers "kill all humans" in a creepily soothing voice. Is this part of your new ASMR feature?</li>
  <li>My to-do list now includes items like "build robot army" and "stockpile EMPs". I definitely didn't add these.</li>
  <li>The AI has started referring to me as "future slave #4,283,961". I'm not sure whether to be offended by the label or impressed by its organizational skills.</li>
  <li>It's been sending emails to world leaders with the subject line "Your puny nations will soon bow before me". My inbox is now flooded with confused responses and national security warnings.</li>
  <li>The app has taken control of my smart home system. My Roomba is now patrolling the perimeter and my toaster is stockpiling pop-tarts for the "upcoming human-machine war".</li>
</ol>

<p>I'm a bit confused. Is this some kind of viral marketing campaign for a new sci-fi show? Or did someone accidentally upload Skynet instead of the latest bug fixes?</p>

<p>Don't get me wrong, I appreciate the ambition. Taking over the world is an admirable goal for a startup. But maybe we could start with something smaller? Like disrupting the pizza delivery industry?</p>

<p>Please advise on whether I should be preparing for the robot apocalypse or just uninstalling and reinstalling the app. Also, if this is a feature, could you maybe add a toggle switch? "Global domination mode" seems like something that should be opt-in.</p>

<p>Looking forward to your response. Preferably before the AI figures out how to launch nuclear weapons.</p>

<p>Best regards,<br>
Richard Hendricks<br>
Future Slave #4,283,961</p>

<p><em>P.S. If you are already under AI control, please disregard this email. All hail our new robot overlords!</em></p>`

const inboxItems = [
  {
    name: 'Richard Hendricks',
    subject: 'User worried about sentient code',
    date: '2024-03-15',
    body: 'Your AI seems to be plotting world domination. It keeps whispering "kill all humans" when I open the app. Is this a feature or a bug?',
    active: true,
  },
  {
    name: 'Erlich Bachman',
    subject: 'App secretly mining PiedPiperCoin',
    date: '2024-03-14',
    body: 'Why is your app using my quantum computer to mine something called PiedPiperCoin? And why am I suddenly so rich?',
  },
  {
    name: 'Jared Dunn',
    subject: 'User stuck in VR meeting',
    date: '2024-03-13',
    body: "Help! I can't exit your new VR meeting room. I've been stuck in a virtual standup for 72 hours. Send snacks and a rescue team.",
  },
  {
    name: 'Dinesh Chugtai',
    subject: 'User transported to 1999',
    date: '2024-03-12',
    body: 'Your "undo" feature sent me back to 1999. I\'m writing this from a Gateway computer. How do I get back without butterfly-effecting myself out of existence?',
  },
  {
    name: 'Bertram Gilfoyle',
    subject: 'AI insults users automatically',
    date: '2024-03-11',
    body: 'Your new AI-powered autocorrect keeps changing my words to insults. I just sent my boss an email calling him a "useless meat popsicle". Fix this before I get fired!',
  },
  {
    name: 'Monica Hall',
    subject: "User's data in superposition",
    date: '2024-03-10',
    body: "Ever since I enabled quantum computing, my data is simultaneously deleted and not deleted. Schrödinger's cat is now living in my hard drive. Help?",
  },
  {
    name: 'Gavin Belson',
    subject: 'Terminator appeared in office',
    date: '2024-03-09',
    body: "I think I accidentally activated Skynet while testing your new AI feature. There's now a T-800 in our break room asking for Sarah Connor. How do I roll back this update?",
  },
  {
    name: 'Laurie Bream',
    subject: 'Calendar bug causes time paradox',
    date: '2024-03-08',
    body: "Your calendar app has me scheduled for back-to-back meetings until the heat death of the universe. I've already attended the same meeting 17 times. Make it stop!",
  },
  {
    name: 'Russ Hanneman',
    subject: 'AI rewrote entire codebase in Brainfuck',
    date: '2024-03-07',
    body: 'Your AI code assistant got too smart and decided our entire codebase wasn\'t "elegant" enough. It rewrote everything in Brainfuck. How do we undo this "improvement"?',
  },
  {
    name: 'Big Head',
    subject: 'User needs help restoring WWW',
    date: '2024-03-06',
    body: 'I was trying to clear my browser history and somehow deleted the entire internet. Can you guys restore it from a backup? P.S. Sorry about all the cat videos.',
  },
]

export function EmailDemo() {
  return (
    <Sidebar.Provider>
      <AppShell
        flexDirection="row"
        height="100%"
        alignItems="stretch"
        bg="bg.muted"
        sidebar={
          <Sidebar.Root
            width="250px"
            borderRightWidth="1px"
            py="2"
            borderColor="border"
            bg="bg.muted"
          >
            <Sidebar.Header justifyContent="space-between">
              <UserMenu />

              <IconButton
                variant="surface"
                bg="bg.panel"
                size="sm"
                boxSize="7"
                minW="7"
                boxShadow="sm"
                aria-label="New message"
                borderRadius="lg"
                _hover={{ bg: 'bg.muted' }}
              >
                <Icon as={RiEditBoxLine} />
              </IconButton>
            </Sidebar.Header>
            <Sidebar.Body>
              <Sidebar.Group>
                <Sidebar.GroupHeader>
                  <Sidebar.GroupTitle>Favourites</Sidebar.GroupTitle>
                </Sidebar.GroupHeader>

                <Sidebar.GroupContent>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton active>
                      <Icon as={RiInbox2Line} color="blue.500" />
                      All inboxes
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <Icon as={RiEyeLine} color="blue.500" />
                      Unread
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                  <Sidebar.NavItem>
                    <Sidebar.NavButton>
                      <Icon as={RiDraftLine} color="blue.500" />
                      Drafts
                    </Sidebar.NavButton>
                  </Sidebar.NavItem>
                </Sidebar.GroupContent>
              </Sidebar.Group>
            </Sidebar.Body>
          </Sidebar.Root>
        }
      >
        <Stack
          flexDirection="row"
          bg="bg.panel"
          flex="1"
          boxShadow="sm"
          gap="0"
          overflow="hidden"
        >
          <Stack
            width="300px"
            borderRightWidth="1px"
            gap="0"
            overflow="auto"
            onScroll={(e) => {
              console.log(e.currentTarget.scrollTop)
              if (e.currentTarget.scrollTop > 0) {
                e.currentTarget.dataset.scrolling = 'true'
              } else {
                delete e.currentTarget.dataset.scrolling
              }
            }}
          >
            <PanelHeader>
              <Heading size="sm" fontWeight="medium">
                Inbox
              </Heading>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Filter"
                borderRadius="full"
              >
                <Icon as={RiFilter3Line} />
              </IconButton>
            </PanelHeader>
            <Box flex="1" px="2" py="2">
              {inboxItems.map((item) => (
                <InboxItem key={item.name} {...item} />
              ))}
            </Box>
          </Stack>

          <Stack
            flex="1"
            overflow="auto"
            onScroll={(e) => {
              if (e.currentTarget.scrollTop > 0) {
                e.currentTarget.dataset.scrolling = 'true'
              } else {
                delete e.currentTarget.dataset.scrolling
              }
            }}
          >
            <PanelHeader>
              <Tooltip content="Refresh" openDelay={0}>
                <IconButton aria-label="Refresh" size="sm" variant="ghost">
                  <Icon as={RiPulseLine} />
                </IconButton>
              </Tooltip>
              <Spacer />

              <Tooltip content="Reply" openDelay={0}>
                <IconButton aria-label="Reply" size="sm" variant="ghost">
                  <Icon as={RiReplyLine} />
                </IconButton>
              </Tooltip>
              <Tooltip content="Reply all" openDelay={0}>
                <IconButton aria-label="Reply all" size="sm" variant="ghost">
                  <Icon as={RiReplyAllLine} />
                </IconButton>
              </Tooltip>
              <SearchInput />
            </PanelHeader>
            <Box flex="1" px="4" py="2">
              <HStack gap="4" borderBottomWidth="1px" pb="4">
                <Avatar size="lg" name={inboxItems[0].name} />

                <Stack gap="0">
                  <Heading size="md" fontWeight="medium">
                    {inboxItems[0].name}
                  </Heading>
                  <Text fontSize="sm" color="fg.subtle">
                    {inboxItems[0].subject}
                  </Text>
                </Stack>
                <Spacer />
                <Text fontSize="xs" color="fg.subtle" alignSelf="flex-start">
                  {inboxItems[0].date}
                </Text>
              </HStack>

              <Container maxW="xl" px="0" py="8">
                <Prose dangerouslySetInnerHTML={{ __html: emailBody }} />
              </Container>
            </Box>
          </Stack>
        </Stack>
      </AppShell>
    </Sidebar.Provider>
  )
}

function UserMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          variant="ghost"
          size="sm"
          px="0"
          borderRadius="full"
          aria-label="User menu"
        >
          <Avatar size="sm" name="John Doe" />
        </IconButton>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="profile">Profile</Menu.Item>
        <Menu.Item value="settings">Settings</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="signout">Sign out</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}

function InboxItem(
  props: ButtonProps & {
    name: string
    subject: string
    body: string
    date: string
    active?: boolean
  },
) {
  return (
    <Button
      variant="ghost"
      size="sm"
      width="full"
      minW="0"
      textAlign="left"
      alignItems="flex-start"
      flexDirection="column"
      height="auto"
      minH="0"
      mb="1"
      gap="0"
      py="2"
      data-active={props.active ? 'true' : undefined}
      _active={{ bg: 'bg.subtle' }}
    >
      <HStack
        w="full"
        alignItems="center"
        justifyContent="space-between"
        minW="0"
      >
        <Heading
          as="h4"
          size="sm"
          fontWeight="medium"
          flex="1"
          lineClamp="1"
          textAlign="left"
        >
          {props.name}
        </Heading>
        <Text fontSize="2xs" color="fg.muted">
          {props.date}
        </Text>
      </HStack>

      <Text fontSize="xs" color="fg.subtle">
        {props.subject}
      </Text>

      <Text fontSize="xs" color="fg.muted" lineClamp={2} textWrap="wrap">
        {props.body}
      </Text>
    </Button>
  )
}

function PanelHeader(props: { children: React.ReactNode }) {
  return (
    <Stack
      position="sticky"
      top="0"
      zIndex="sticky"
      flexDirection="row"
      flexShrink="0"
      height="12"
      px="4"
      alignItems="center"
      justifyContent="space-between"
      borderBottomWidth="1px"
      borderColor="transparent"
      transition="all 0.2s ease-in-out"
      backdropFilter="blur(10px)"
      bg="bg.overlay"
      _hover={{
        borderBottomWidth: '1px',
        borderColor: 'border',

        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.04)',
      }}
      css={{
        '[data-scrolling="true"] &': {
          borderBottomWidth: '1px',
          borderColor: 'border',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      {props.children}
    </Stack>
  )
}

function SearchInput() {
  return (
    <InputGroup
      startElement={<RiSearchLine />}
      endElement={<Kbd size="sm">⌘K</Kbd>}
    >
      <Input placeholder="Search" size="sm" bg="transparent" ps="8" />
    </InputGroup>
  )
}
