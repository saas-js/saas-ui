import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { Badge, BadgeProps, chakra } from '@chakra-ui/react'
import * as Icons from '@chakra-ui/icons'
import * as SaasUI from '@saas-ui/react'
import * as SaasUIPro from '@saas-ui/pro'
import * as SaasUIFeatures from '@saas-ui/features'

import * as Web3 from '@saas-ui/web3'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { yupForm } from '@saas-ui/forms/yup'
import SaasUILogo from '@/components/saas-ui'
import SaasUIGlyph from '@/components/saas-ui-glyph'
import * as sampleData from '@/data/sample-data'
import FocusLock from 'react-focus-lock'

import {
  FiHome,
  FiInbox,
  FiUsers,
  FiUser,
  FiFilter,
  FiCircle,
  FiSettings,
  FiTag,
  FiArchive,
  FiTruck,
  FiLock,
  FiCheck,
  FiArrowRight,
  FiAlertTriangle,
  FiHelpCircle,
  FiAlignLeft,
  FiAlignRight,
  FiAlignCenter,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
} from 'react-icons/fi'

import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaSlack,
  FaCookie,
} from 'react-icons/fa'

const reactIcons = {
  FiHome,
  FiInbox,
  FiUsers,
  FiUser,
  FiFilter,
  FiCircle,
  FiSettings,
  FiTag,
  FiArchive,
  FiTruck,
  FiLock,
  FiCheck,
  FiArrowRight,
  FiAlertTriangle,
  FiHelpCircle,
  FiAlignLeft,
  FiAlignRight,
  FiAlignCenter,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaSlack,
  FaCookie,
}

const StarIcon = (props) => (
  <chakra.svg m="2px" fill="current" boxSize="3" viewBox="0 0 24 24" {...props}>
    <path d="M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z" />
  </chakra.svg>
)

const saveHandler = (params) => {
  console.log(params)
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

const StatusBadge = (props: BadgeProps) => (
  <Badge boxSize="8px" mx="2px" borderRadius="full" {...props} />
)

const SaasSpinner = () => <SaasUIGlyph width="48px" height="48px" isAnimating />

const ThrowSomeError = () => {
  throw new Error()
}

const ReactLiveScope = {
  React,
  ...React,
  ...Chakra,
  ...SaasUIPro,
  ...SaasUI,
  ...SaasUIFeatures,
  ...Web3,
  ...Icons,
  Yup,
  yupResolver,
  yupForm,
  // ...Loaders,
  ...reactIcons,
  StarIcon,
  FocusLock,
  saveHandler,
  ...sampleData,
  SaasUILogo,
  SaasUIGlyph,
  StatusBadge,
  SaasSpinner,
  ThrowSomeError,
}

export default ReactLiveScope
