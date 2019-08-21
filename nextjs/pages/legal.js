import React, { Component } from 'react'
import { Tabs } from 'antd'
import Card from '../components/Card'
import queryString from 'query-string'

const { TabPane } = Tabs

let CookieCopy = () => (
  <div>
    <h3>What is a cookie?</h3>
    <p>
      A cookie is a small text file that is placed on your hard drive by a web page server. Cookies contain information
      that can later be read by a web server in the domain that issued the cookie to you. Some of the cookies will only
      be used if you use certain features or select certain preferences and some cookies are essential to the Site,
      Software, and/or Services, and will always be used. Web beacons, tags, and scripts may be used in the Site or in
      emails to help us deliver cookies and count visits, understand usage and campaign effectiveness, and determine
      whether an email has been opened and acted upon. We may receive reports based on the use of these technologies by
      our service/analytics providers (for example, Google Analytics) on an individual and aggregated basis.
    </p>
    <h3>Why does Codeleak use cookies?</h3>
    <p>
      Codeleak and our marketing partners, affiliates, and analytics or service providers use cookies and other
      technologies to ensure everyone who uses the Site, Software, and/or Services has the best possible experience. For
      example, when you use our Site, we may place a number of cookies in your browser. We use these cookies to enable
      us to hold session information as you navigate from page to page within the Site, improve your experience, and
      track and analyse usage and other statistical information. If you elect not to activate the cookie or to later
      disable cookies, you may still visit our Site, and use our Software or Services, but your ability to use some
      features or areas of those offerings may be limited.
    </p>
    <h3>These cookies:</h3>
    <p>
      Validate the authenticity of persons attempting to gain access to a specific user account Help us to comply with
      legal requirements in recruitment and hiring Provide a means of contact for Talent employers (including opting out
      of the Talent candidate listings) Allow employers to target specific users (via searches and marketing efforts)
      who are likely to qualify for a given position Allow users to save searches in order to more quickly identify
      newly listed jobs Create a channel of direct communication between our support staff and users who request
      assistance Support integration of job applications and listings from our platform to third-party applicant
      tracking systems (ATS).
    </p>
  </div>
)

let PrivacyCopy = () => (
  <div>
    <p>
      At Codeleak, we care about the privacy of your data and are committed to protecting it. This Privacy Policy
      explains what information we collect about you and why, what we do with that information, and how we handle that
      information.
    </p>
    <div>
      <h3>Why do we have a Privacy Policy?</h3>
      <p>
        We’ll collect certain personal information from you when you use our website, when you get in touch with us
        about any of our products or services, and during any process to sign up, change or cancel your products and
        services. The purpose of our Privacy Policy is to let you know: how and why we collect your personal
        information; how we use and disclose your personal information (and to whom); how we protect your personal
        information; and your legal rights and how the law protects you.{' '}
      </p>
      <h3>Information collection and use What Information does Amondo collect about me?</h3>
      <p>
        When you interact with our Site,Software, and/or Services, we collect Information that, alone or in combination
        with other data, could be used to identify you (“Personal Data”). Some of the Information we collect is stored
        in a manner that cannot be linked back to you (“Non-Personal Data”).
      </p>
      <h3>Information you choose to give us when you create an account</h3>
      <p>
        When you sign up for or use our Services, you voluntarily give us certain Personal Data, including: Your full
        name, password and email address. If you log into Codeleak or connect it with a social networking credential,
        such as with your Facebook, Instagram, Spotify, Twitter or YouTube account, we will ask permission to access
        basic information from that account, such as your name and email address. You can stop sharing that information
        with us at any time by removing Codeleak’s access to that account. To make it easier for others to find you, we
        may also ask you to provide us with some additional information that will be publicly visible on our services,
        such as profile pictures, a username or other useful identifying information.
      </p>
    </div>
  </div>
)

class Legal extends Component {
  state = {
    activeTab: '',
  }

  componentDidMount() {
    if (window.location.hash) {
      this.setState({ activeTab: window.location.hash })
    }
  }

  render() {
    return (
      <Card>
        <Tabs defaultActiveKey={this.state.activeTab}>
          <TabPane tab="Cookie policy" key="#cookie">
            <CookieCopy />
          </TabPane>
          <TabPane tab="Privacy policy" key="#privacy">
            <PrivacyCopy />
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default Legal
