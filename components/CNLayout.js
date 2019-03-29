import Head from 'next/head'
import Navigation from './CNNavigation'

export default function Layout(props) {
  return (
    <div>
      <Navigation navActive={props.navActive} />
      {props.children}
    </div>
  )
}

