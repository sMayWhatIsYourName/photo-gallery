import axios from 'axios';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { IPhoto } from '../../interfaces/photo.interface';
import styles from '../../styles/Home.module.css';
import { ParsedUrlQuery } from 'querystring';

const PhotoPage = ({ photo }: IPhotoPage) => {
  const height = 400 * (photo.height / photo.width);
  return (
    <div className={styles.container}>
      <Head>
        <title>Картинка</title>
        <meta name="description" content="Картинка" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.headling}>Картинка</h1>
        <h2 className={styles.description}>Картинка, картинка, картинка и... картинка.</h2>
        <div className="center mt-10vh">
          <Image className={styles.detailPhoto} src={photo.urls.small} quality={100} alt="Cat photo" width="400" height={height} />
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IPhotoPage> = async ({ params }: GetServerSidePropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const { data } = await axios.get<IPhoto>(`https://api.unsplash.com/photos/${params.id}`, {
    headers: {
      Authorization: `Client-ID ${process.env.TOKEN}`
    }
  });
  return {
    props: {
      photo: data,
    },
  };
};

interface IPhotoPage extends Record<string, unknown> {
  photo: IPhoto;
}

export default PhotoPage;
