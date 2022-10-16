import Image from 'next/image';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import styles from './PhotoList.module.css';
import { store } from '../../store';
import { observer } from 'mobx-react';
import InfiniteScroll from "react-infinite-scroll-component";


const PhotoList = () => {
  const { photos, fetchPhotos } = store;
  return (
    <InfiniteScroll
      next={fetchPhotos}
      dataLength={photos.length}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <Masonry
        breakpointCols={{
          default: 4,
          1200: 3,
          800: 2,
          400: 1,
        }}
        className={styles['my-masonry-grid']}
        columnClassName={styles['my-masonry-grid_column']}
      >
        {photos.map((photo, i) => {
          const height = 400 * (photo.height / photo.width);
          return (
            <Link
              key={photo.id+i}
              href={`/photo/${photo.id}`}
            >
              <Image className={styles.headlingPhoto} priority={true} quality={100} src={photo.urls.small} alt="Photo" width={400} height={height} />
            </Link>
          );
        })}
      </Masonry>
    </InfiniteScroll>
  );
};

export default observer(PhotoList);