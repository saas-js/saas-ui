import { Box, Heading, VStack } from '@chakra-ui/react'

import Section from '@/components/marketing/section-wrapper'

import ReactMarkdown from 'react-markdown'
import SEO from '@/components/seo'

const License = () => {
  return (
    <Box py={20}>
      <SEO
        title="License"
        titleTemplate="%s - Saas UI"
        description="Read the Saas UI License Agreement"
      />
      <Heading textAlign="center">License Agreement</Heading>

      <Section innerWidth="xl">
        <VStack
          alignItems="start"
          spacing="4"
          sx={{
            h1: {
              fontWeight: 'bold',
              fontSize: 'xl',
            },
            h2: {
              fontWeight: 'bold',
            },
          }}
        >
          <ReactMarkdown>{community}</ReactMarkdown>
          <ReactMarkdown>{pro}</ReactMarkdown>
        </VStack>
      </Section>
    </Box>
  )
}

export default License

const community = `
# Saas UI Community License Agreement

Copyright 2024 Saas UI B.V.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

const pro = `
# Saas UI Pro License Agreement

Last updated 18th of September, 2024

This license is a legal agreement between you (either an individual or a single entity, also referred to as "LICENSEE", "YOU") and Saas UI B.V. ("SAAS UI") for the use of Saas UI Pro (the "SOFTWARE") or Saas UI Figma Pro (the "DESIGN SYSTEM").

By purchasing, installing, or using the SOFTWARE or DESIGN SYSTEM, you agree to be bound by the terms and conditions of this License Agreement. SAAS UI reserves the right to alter this agreement at any time, for any reason, without notice.

## Permitted Use

### Design (figma) License
You are granted a license to use the DESIGN SYSTEM to create unlimited applications with access, and one editor.

### Bootstrap (single) License
You are granted a license to use the SOFTWARE as the basis of one commercial application, unlimited internal applications and one developer, so long as that application is owned and operated by you, the LICENSEE, or is owned and operated by clients of LICENSEE.

### Startup (unlimited) License
You are granted a license to use the SOFTWARE as the basis of unlimited applications and up to 20 developers, so long as that application is owned and operated by you, the LICENSEE, or is owned and operated by clients of LICENSEE.

## Restrictions
Unless you have been granted prior, written consent from SAAS UI, you may not:

- At no time may the SOFTWARE be used for development purposes by other individuals than the licensed developer(s).
- The SOFTWARE and/or DESIGN SYSTEM may not be distributed for use with solutions or packaged products other than those developed by you.
- The SOFTWARE and/or DESIGN SYSTEM may not be distributed as part of products that have the same or substantially the same primary functionality.
- You are not allowed to resell, transfer, rent, lease, or sublicense the SOFTWARE, and/or DESIGN SYSTEM and your associated rights.
- Under no circumstances shall you grant further redistribution rights to the end-users of your solution.
- You are not allowed to use, copy, modify, or merge copies of the SOFTWARE, DESIGN SYSTEM, and any accompanying documents except as permitted in this LICENSE.

## Redistribution Rights
You may distribute the SOFTWARE provided that:

You reasonably ensure that the SOFTWARE is not distributed in any form that allows it to be reused by any application other than your solution. You need to duly inform your customers that they are not allowed to use the SOFTWARE independently from your solution, and that to redistribute the SOFTWARE in any form they must obtain an appropriate license from SAAS UI.

You may not redistribute the SOFTWARE to anyone and via any means other than to your customers as a part of a purchased, integrated solution, that includes functionality above and beyond that provided solely by the SOFTWARE.

## Technical Support
Technical support is limited to bug reports and feature requests. No support will be provided to diagnose or advise application-level code issues. If you require more specialised support or consultancy contact us at hello@saas-ui.dev.

## Refunds
SAAS UI offers limited refunds on SOFTWARE and DESIGN SYSTEM within 14 days of purchase. Contact hello@saas-ui.dev for assistance.

If we issue a refund, you agree to delete all files within 24 hours and are not permitted to use SOFTWARE or DESIGN SYSTEM in projects (including personal/non-commercial projects).

## Indemnity
You agree to indemnify and hold harmless SAAS UI and its resellers for any third-party claims, actions or suits, as well as any related expenses, liabilities, damages, settlements or fees arising from your use or misuse of the Software, or a violation of any terms of this license.

## Miscellaneous
This license is governed by the laws of The Netherlands. If any provision of this license is to be held unenforceable, such holding will not affect the validity of the other provisions hereof. Failure of a party to enforce any provision of this license shall not constitute or be construed as a waiver of such provision or of the right to enforce such provision. This license represents the entire understanding between the parties with respect to its subject matter.

## Disclaimer Of Warranty
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF QUALITY, PERFORMANCE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE. FURTHER, SAAS UI DOES NOT WARRANT THAT THE SOFTWARE OR ANY RELATED SERVICE WILL ALWAYS BE AVAILABLE.

## Limitations Of Liability
YOU ASSUME ALL RISK ASSOCIATED WITH THE INSTALLATION AND USE OF THE SOFTWARE. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS OF THE SOFTWARE BE LIABLE FOR CLAIMS, DAMAGES OR OTHER LIABILITY ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE. LICENSE HOLDERS ARE SOLELY RESPONSIBLE FOR DETERMINING THE APPROPRIATENESS OF USE AND ASSUME ALL RISKS ASSOCIATED WITH ITS USE, INCLUDING BUT NOT LIMITED TO THE RISKS OF PROGRAM ERRORS, DAMAGE TO EQUIPMENT, LOSS OF DATA OR SOFTWARE PROGRAMS, OR UNAVAILABILITY OR INTERRUPTION OF OPERATIONS.

`
