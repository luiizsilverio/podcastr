import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {  parseISO } from 'date-fns'

import { api } from '../../services/api'
import { formatDate } from '../../utils/formatDate'
import { convertDurationToString } from "../../utils/convertDurationToString"
import styles from './episode.module.scss'

type Episode = {  
  id: string;
  title: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
}

type EpisodeProps = {
  episode: Episode  
}

export default function Episode({ episode }: EpisodeProps) {  
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnail}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700} height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>    

      <header>
        <h1>{ episode.title }</h1>
        <span>{ episode.members }</span>
        <span>{ episode.publishedAt }</span>
        <span>{ episode.durationAsString }</span>
      </header>     

      <div className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}      
      />      
      
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    ...data,
    publishedAt: formatDate(parseISO(data.published_at)),
    duration: Number(data.duration),
    durationAsString: convertDurationToString(Number(data.file.duration)),
    url: data.file.url,
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 8, // 8 horas
  }
} 