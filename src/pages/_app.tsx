import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import Header from "../components/Header/Header"
import Player from "../components/Player/Player"
import { PlayterContext } from '../contexts/PlayerContext'

function MyApp({ Component, pageProps }) {
  return (
    <PlayterContext.Provider value={'aaa'}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>\
    </PlayterContext.Provider>
  )
}

export default MyApp
