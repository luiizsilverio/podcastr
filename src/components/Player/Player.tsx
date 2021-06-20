import { useContext, useEffect, useRef } from 'react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import styles from './styles.module.scss'
import { PlayerContext } from '../../contexts/PlayerContext'

export default function Player() {  
  const audioRef = useRef<HTMLAudioElement>(null)
  
  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying,
    togglePlay,
    setPlayingState
   } = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex]

  useEffect(() => {
    if (audioRef.current) {
      isPlaying
        ? audioRef.current.play()
        : audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
        <div className={styles.currentEpisode}>
          <Image 
            width={592} height={592}
            src={ episode.thumbnail } 
            objectFit="cover" 
          />
          <strong>{ episode.title }</strong>
          <span>{ episode.members }</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      ) }

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            { episode ? (
              <Slider 
                trackStyle={{backgroundColor: '#84d361'}}
                railStyle={{backgroundColor: '#9f75ff'}}
                handleStyle={{backgroundColor: '#84d361'}}               
              />
            ) : (
              <div className={styles.emptySlider} />
            ) }
          </div>
          <span>00:00</span>
        </div>

        { episode && (
          <audio 
            src={ episode.url }
            ref={ audioRef }
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" 
          />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" 
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            { !isPlaying
              ? <img src="/play.svg" alt="Tocar" />
              : <img src="/pause.svg" alt="Pausar" />
            }
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
