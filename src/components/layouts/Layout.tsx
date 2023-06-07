import React, { FC } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

type Props = {
    children: React.ReactNode
}

const Layout: FC<Props> = ({children}) => {
  return (
    <div>
        <Header/>
          {children}
        <Footer/>
    </div>
  )
}

export default Layout