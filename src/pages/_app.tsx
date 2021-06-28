import Header from "../components/Header/Header"
import Player from "../components/Player/Player"

import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { PlayterContextProvider } from "../contexts/PlayerContext"

function MyApp({ Component, pageProps }) {
  return (    
    <PlayterContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>    
    </PlayterContextProvider>
  )
}

export default MyApp
