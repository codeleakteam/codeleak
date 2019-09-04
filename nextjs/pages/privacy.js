import React from 'react'
import Head from 'next/head'
import { Title, Section, SectionHeading, Text, StyledCard, Ul } from '../components/Legal/shared'

const Privacy = () => (
  <>
    <Head>
      <title>Privacy Policy</title>
    </Head>
    <StyledCard>
      <Title>Codeleak Privacy Policy</Title>
      <Section>
        <Text>
          At Codeleak, we care about the privacy of your data and are committed to protecting it. This Privacy Policy
          explains what information we collect about you and why, what we do with that information, and how we handle
          that information.
        </Text>
      </Section>

      <Section>
        <SectionHeading>Definitions</SectionHeading>
        <Ul>
          <li>“Service” is the codeleak.io website operated by the independent individuals.</li>
          <li>
            “Personal Data” means data about a living individual who can be identified from that data (or from those and
            other information either in our possession or likely to come into our possession). Personal Data may
            include, but is not limited to email addresses, first and last names, cookies, and usage data.
          </li>
          <li>"Cookies" are small pieces of data stored on your device (computer or mobile device).</li>
        </Ul>
      </Section>

      <Section>
        <SectionHeading>Information Collection</SectionHeading>
        <Text>
          We will collect Personal Data about you from a variety of sources, including information We collect from you
          directly, information we automatically collect from your use of the Service, and information we collect about
          you from other sources, described below.
        </Text>

        <Ul>
          <li>
            You may complete a profile, which may include your name, username, profile photo, website, social account
            usernames, email and any additional profile information you chose to provide. Please note that your profile
            information will be visible to other users of our Service; and
          </li>
          <li>
            You may choose to provide us with certain information when you post or upload content to the Service, fill
            out a form, and/or post to Codeleak's forums on spectrum.chat website.
          </li>
          <li>
            We automatically collect information from cookies and similar technologies (such as cookies IDs and
            settings) to recognize you, track your behavior on the Service and your device, and to improve and analyze
            Our Service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            However, if you do not accept cookies, you may not be able to use some portions of our Service. We use
            Session Cookies to operate our Service. We use Preference Cookies to remember your preferences and various
            settings. We use Security Cookies for security purposes.
          </li>
        </Ul>
      </Section>

      <Section>
        <SectionHeading>Use of Data</SectionHeading>
        <Text>We use the collected data to provide and maintain our Service:</Text>
        <Ul>
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
        </Ul>
      </Section>

      <Section>
        <SectionHeading>Service Providers</SectionHeading>
        <Text>
          We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to
          provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our
          Service is used.
          <br />
          These third parties have access to your Personal Data only to perform these tasks on our behalf and are
          obligated not to disclose or use it for any other purpose. We may use third-party Service Providers to monitor
          and analyze the use of our Service.
          <br />
          We use Google Analytics, a web analytics service offered by Google that tracks and reports website traffic.
          Google uses the data collected to track and monitor the use of our Service. This data is shared with other
          Google services. Google may use the collected data to contextualize and personalize the ads of its own
          advertising network.
          <br />
          You can opt-out of having made your activity on the Service available to Google Analytics by installing the
          Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js,
          analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.
          <br />
          For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page.
        </Text>
      </Section>
      <Section>
        <SectionHeading>Contact Us</SectionHeading>
        <Text>If you have any questions about this Privacy Policy, please contact us by email: hi@codeleak.io</Text>
      </Section>
    </StyledCard>
  </>
)

export default Privacy
