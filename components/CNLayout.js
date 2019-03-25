import Head from 'next/head'
import Navigation from './CNNavigation'

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>Car Now</title>
        <meta charSet="utf-8" key="charset" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </Head>
      <Navigation navActive={props.navActive}/>
      {props.children}
    </div>
  )
}
