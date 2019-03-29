import Layout from '../components/CNLayout'
import React from 'react'
import App, { Container } from 'next/app'

class CNApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Layout navActive={this.props.router.pathname}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}

export default CNApp
