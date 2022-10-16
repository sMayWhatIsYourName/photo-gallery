import axios from 'axios';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { IPhoto } from '../interfaces/photo.interface';
import styles from '../styles/Home.module.css';
import { store } from '../store';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import PhotoList from '../components/PhotoList/PhotoList';

const Home = ({ images }: IHomePage) => {
  useEffect(() => {
    store.setPhotos(images);
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Картинки</title>
        <meta name="description" content="Картинки" />
        <link rel="icon" href="/cat.webp" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.headling}>Картинки</h1>
        <h2 className={styles.description}>Картинки, картинки, картинки и... картинки.</h2>
        <h4 className={styles.description}>Можешь покликать по фоткам</h4>
        <div className="center mb-10vh">
          <Image className="br-50" src="/cat.webp" quality={100} alt="Cat photo" width="300" height="300" />
        </div>
        <PhotoList />
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<IHomePage> = async () => {
  const { data } = await axios.get<IPhoto[]>('https://api.unsplash.com/photos?page=1&per_page=30', {
    headers: {
      Authorization: `Client-ID ${process.env.TOKEN}`
    }
  });
  return {
    props: {
      images: data,
    },
    revalidate: 600,
  };
};

interface IHomePage extends Record<string, unknown> {
  images: IPhoto[];
}

export default observer(Home);
