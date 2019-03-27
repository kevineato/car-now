import Head from 'next/head'
import Navigation from './CNNavigation'

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>Car Now</title>
        <meta charSet="utf-8" key="charset" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <Navigation navActive={props.navActive} />
      {props.children}
    </div>
  )
}

