import { Box, Heading, VStack } from '@chakra-ui/layout'

import Section from '@/components/marketing/section-wrapper'

import ReactMarkdown from 'react-markdown'

const License = () => {
  return (
    <Box py={20}>
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

Copyright 2021 Appulse Holding B.V.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

const pro = `
# Saas UI Pro License Agreement

Last updated 2nd of Februari, 2021

By purchasing, installing, or using Saas UI Pro, you agree to be bound by the terms and conditions of this License Agreement.

This license agreement (“LICENSE”) is a legal agreement between you (either an individual or a single entity, also referred to as "LICENSEE", "YOU") and Appulse Holding B.V. ("SAAS-UI"). The software containing this LICENSE also includes the software’s source code, associated media and online or electronic documentation (collectively referred to as “SOFTWARE”).

Any earlier license agreement granted to you for the use of earlier versions of the SOFTWARE is replaced by this LICENSE.

You may use the SAAS-UI source code for the purpose of building web applications for yourself and your clients, in accordance with the license you have purchased.

You may not redistribute or re-sell the source code.

## Software Product License

The SOFTWARE is protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties and contains confidential information and trade secrets. SAAS-UI retains all rights not expressly granted to you in this LICENSE.

## Grant of License

SAAS-UI hereby grants to you, and you accept, a non-exclusive, non-transferable license to install, copy, use and modify the SOFTWARE only as permitted in this LICENSE. All product licenses are perpetual and royalty-free.

### Single License

You are granted a license to use the SOFTWARE as the basis of one application and one developer, so long as that application is owned and operated by you, the LICENSEE, or is owned and operated by clients of LICENSEE.

### Unlimited License

You are granted a license to use the SOFTWARE as the basis of unlimited applications and developers, so long as that application is owned and operated by you, the LICENSEE, or is owned and operated by clients of LICENSEE.

## Redistribution Rights

You may distribute the SOFTWARE provided that:

You reasonably ensure that the SOFTWARE is not distributed in any form that allows it to be reused by any application other than your solution. You need to duly inform your customers that they are not allowed to use the SOFTWARE independently from your solution, and that to redistribute the SOFTWARE in any form they must obtain an appropriate license from SAAS-UI.

You may not redistribute the SOFTWARE to anyone and via any means other than to your customers as a part of a purchased, integrated solution, that includes functionality above and beyond that provided solely by the SOFTWARE.

## Source Code

SAAS-UI does not provide technical support for modified source code. The SOFTWARE’s source code is provided as is. In the event that you develop any troubleshooting-related modifications of the SOFTWARE, SAAS-UI will not be responsible for troubleshooting these issues.

You are granted the right to use such modifications as set forth in this agreement. You acknowledge that the SOFTWARE’s source code contains valuable and proprietary trade secrets of SAAS-UI. All individuals employed by or belonging to your entity agree to expend every effort to insure its confidentiality.

You agree to assume full responsibility for such employees’ or contractors’ use, or misuse, of such disclosed source code as if it was your use. These obligations shall not apply to any information generally available to the public, independently developed or obtained without reliance on SAAS-UI information, or approved in writing for release by SAAS-UI without restriction.

## Other Rights and Limitations

At no time may the SOFTWARE be used for development purposes by other individuals than the licensed developer(s). The SOFTWARE may not be distributed for use with solutions or packaged products other than those developed by you.

The SOFTWARE may not be distributed as part of products that have the same or substantially the same primary functionality. You are not allowed to resell, transfer, rent, lease, or sublicense the SOFTWARE and your associated rights. Under no circumstances shall you grant further redistribution rights to the end-users of your solution. You may use the SAAS-UI product names, logos or trademarks to market YOUR SOFTWARE. You are not allowed to use, copy, modify, or merge copies of the SOFTWARE and any accompanying documents except as permitted in this LICENSE.
You agree to indemnify, hold harmless, and defend SAAS-UI and its resellers from and against any and all claims or lawsuits including attorney's fees that arise or result from the use or distribution of your software.

## Delivery

SAAS-UI shall deliver to LICENSEE a master copy of the SOFTWARE licensed hereunder in electronic files only. Documentation shall also be provided in electronic format.

## Termination

This LICENSE shall last as long as you use the SOFTWARE in compliance with this LICENSE. SAAS-UI may terminate this LICENSE if you fail to comply with any of the terms and conditions herein. In such event, you agree to remove and destroy all copies of the SOFTWARE and any applicable source code.

SAAS-UI reserves the right to discontinue at any time any product, shall it be offered individually or as a part of a product suite.

## Copyright

All title and copyrights in and to the SOFTWARE, and any copies of the SOFTWARE, and any trademarks or service marks of SAAS-UI are owned by SAAS-UI. All title and intellectual property rights in and to the content that may be accessed through use of the SOFTWARE is the property of the respective content owner and may be protected by applicable copyright or other intellectual property laws and treaties. This LICENSE grants you no rights to use such content.

## Intellectual Property

SAAS-UI is the sole and exclusive owner of all intellectual property, copyright and software rights other than those pertaining to third party plugins or bespoke code that has been developed in addition to the core SAAS-UI product as part of a bespoke plan on a per-customer basis. The License shall not create, or be deemed to create, any ownership right, title or interest in or to the software for the master licensee or any other person.

## Limited Warranty

SAAS-UI warrants solely that the SOFTWARE will perform substantially in accordance with the accompanying written materials for a period of fourteen (14) days. SAAS-UI does not warrant the use of the SOFTWARE will be uninterrupted or error free at all times and in all circumstances, nor that program errors will be corrected.

This limited warranty shall not apply to any error or failure resulting from:

1. machine error
2. LICENSEE's failure to follow operating instructions
3. negligence or accident
4. modifications to the SOFTWARE by any person or entity other than SAAS-UI

In the event of a breach of warranty, LICENSEE's sole and exclusive remedy, is repair of all or any portion of the SOFTWARE. If such remedy fails of its essential purpose, LICENSEE's sole remedy and SAAS-UI'S maximum liability shall be a refund of the paid purchase price for the defective SOFTWARE only.

This limited warranty is only valid if SAAS-UI receives written notice of breach of warranty within thirty days after the warranty period expires.

## Limitation of Liability

To the maximum extent permitted by applicable law, in no event will SAAS-UI or its suppliers or licensors be liable for any indirect, special, incidental, or consequential damages arising out of the use of or inability to use the product, including, without limitation, damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses, even if advised of the possibility thereof, and regardless of the legal or equitable theory (contract, tort or otherwise) upon which the claim is based.

In any case, SAAS-UI'S entire liability under any provision of this agreement shall not exceed in the aggregate the sum of the license fees paid to SAAS-UI for the product giving rise to such damages, notwithstanding any failure of essential purpose of any limited remedy. Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so this exclusion and limitation may not be applicable. SAAS-UI is not responsible for any liability arising out of content provided by LICENSEE or a third party that is accessed through the product and/or any material linked through such content.

Any data included in a product upon shipment from SAAS-UI is for testing use only and SAAS-UI hereby disclaims any and all liability arising therefrom. The extent of SAAS-UI'S liability for the limited warranty section shall be as set forth therein.

## Miscellaneous

This license is governed by the laws of The Netherlands. If any provision of this license is to be held unenforceable, such holding will not affect the validity of the other provisions hereof. Failure of a party to enforce any provision of this license shall not constitute or be construed as a waiver of such provision or of the right to enforce such provision. This license represents the entire understanding between the parties with respect to its subject matter.

You acknowledge that you have read this agreement, that you understand this agreement, and understand that by continuing the installation of the SOFTWARE, by loading or running the SOFTWARE, or by placing or copying the SOFTWARE onto your computer hard drive, you agree to be bound by this agreement's terms and conditions. You further agree that, except for written separate agreements between SAAS-UI and you, this agreement is a complete and exclusive statement of the rights and liabilities of the parties.
`
