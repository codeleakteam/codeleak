import React from 'react'
import Head from 'next/head'
import { Title, Section, SectionHeading, Text, StyledCard } from '../components/Legal/shared'

const TermsOfService = () => (
  <>
    <Head>
      <title>Terms of Service</title>
    </Head>

    <StyledCard>
      <Title>Codeleak Terms of Service</Title>
      <Section>
        <Text>
          These terms of service ("Terms") apply to your access and use of codeleak.io(the "Service"). Please read them
          carefully.
        </Text>
      </Section>

      <Section>
        <SectionHeading>Accepting these Terms</SectionHeading>
        <Text>
          If you access or use the Service, it means you agree to be bound by all of the terms below. So, before you use
          the Service, please read all of the terms. If you don’t agree to all of the terms below, please do not use the
          Service. Also, if a term does not make sense to you, please let us know by e-mailing support@codeleak.io
        </Text>
      </Section>

      <Section>
        <SectionHeading>Privacy Policy</SectionHeading>
        <Text>
          For information about how we collect and use information about users of the Service, please check out our
          privacy policy available at https://codeleak.io/privacy
        </Text>
      </Section>

      <Section>
        <SectionHeading>Third-Party Services</SectionHeading>
        <Text>
          From time to time, we may provide you with links to third party websites or services that we do not own or
          control. Your use of the Service may also include the use of applications that are developed or owned by a
          third party. Your use of such third party applications, websites, and services is governed by that party’s own
          terms of service or privacy policies. We encourage you to read the terms and conditions and privacy policy of
          any third party application, website or service that you visit or use.
        </Text>
      </Section>
      <Section>
        <SectionHeading>Your account</SectionHeading>
        <Text>
          When you create an account or use another service to log in to the Service, you agree to maintain the security
          of your password and accept all risks of unauthorized access to any data or other information you provide to
          the Service.
        </Text>
      </Section>

      <Section>
        <SectionHeading>Your Content & Conduct</SectionHeading>
        <Text>
          Our Service allows you and other users to post, link and otherwise make available content. You are responsible
          for the content that you make available to the Service, including its legality, reliability, and
          appropriateness. When you post, link or otherwise make available content to the Service, you grant us the
          right and license to use, reproduce, modify, publicly perform, publicly display and distribute your content on
          or through the Service. We may format your content for display throughout the Service, but we will not edit or
          revise the substance of your content itself.
        </Text>
      </Section>
    </StyledCard>
  </>
)

export default TermsOfService
