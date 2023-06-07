import '@/assets/styles/globals.scss'
import Layout from '@/components/layouts/Layout'
import store from '@/store'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>

    )
    
}
