import React from 'react'
import Head from 'next/head'
import InDevelopment from '../components/InDevelopment'

export default function() {
  return (
    <React.Fragment>
      <Head>
        <title>Jobs</title>
      </Head>

      <InDevelopment />
    </React.Fragment>
  )
}
