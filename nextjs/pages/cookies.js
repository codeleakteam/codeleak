import React from 'react'
import Head from 'next/head'
import { Title, Section, SectionHeading, Text, StyledCard } from '../components/Legal/shared'

const CookiesPolicy = () => (
  <>
    <Head>
      <title>Cookie Policy</title>
    </Head>

    <StyledCard>
      <Title>Codeleak Cookie Policy</Title>
      <Section>
        <Text>
          A cookie is a small text file that is placed on your hard drive by a web page server. Cookies contain
          information that can later be read by a web server in the domain that issued the cookie to you. Some of the
          cookies will only be used if you use certain features or select certain preferences and some cookies are
          essential to the Site, Software, and/or Services, and will always be used. Web beacons, tags, and scripts may
          be used in the Site or in emails to help us deliver cookies and count visits, understand usage and campaign
          effectiveness, and determine whether an email has been opened and acted upon. We may receive reports based on
          the use of these technologies by our service/analytics providers (for example, Google Analytics) on an
          individual and aggregated basis.
        </Text>
      </Section>

      <Section>
        <SectionHeading>Why does Codeleak use cookies?</SectionHeading>
        <Text>
          We automatically collect information from cookies and similar technologies (such as cookies IDs and settings)
          to recognize you, track your behavior on the Service and your device, and to improve and analyze Our Service.
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
          you do not accept cookies, you may not be able to use some portions of our Service. We use Session Cookies to
          operate our Service. We use Preference Cookies to remember your preferences and various settings. We use
          Security Cookies for security purposes.
        </Text>
      </Section>
    </StyledCard>
  </>
)

export default CookiesPolicy
