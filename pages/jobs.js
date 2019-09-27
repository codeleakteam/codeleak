import React from 'react'
import Head from 'next/head'
import { withAuthSync } from '../helpers/functions/auth'
import InDevelopment from '../components/InDevelopment'

function Jobs() {
  return (
    <React.Fragment>
      <Head>
        <title>Jobs</title>
      </Head>

      <InDevelopment />
    </React.Fragment>
  )
}

export default withAuthSync(Jobs)
