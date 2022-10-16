import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
// import { injectStores } from '@mobx-devtools/tools';
import { IPhoto } from '../interfaces/photo.interface';

// interface IStore {
//   photos: IPhoto[];
//   nextPage: number;
//   fetchPhotos: () => void;
//   setPhotos: (photos: IPhoto[]) => void;
// }

// const obj: IStore = {
//   photos: [],
//   nextPage: 2,
//   async fetchPhotos() {
//     console.log(this.nextPage);
//     const { data: photos } = await axios.get(`https://api.unsplash.com/photos?client_id=BMHgcnpJzN0JOSOwbmfG7jRNqiGE2f62aISEIS2XVZE&page=${this.nextPage}&per_page=30`);
//     this.photos = photos;
//     this.nextPage++;
//   },
//   setPhotos(photos: IPhoto[]) {
//     this.photos = photos;
//   },
// };

// export const store = observable(obj);


class PhotosStore {
  photos: IPhoto[] = [];
  nextPage: number = 3;

  setPhotos(photos: IPhoto[]) {
    this.photos = photos;
  }

  incrementPage() {
    this.nextPage++;
  }

  async fetchPhotos() {
    const { data: photos } = await axios.get(`https://api.unsplash.com/photos?client_id=BMHgcnpJzN0JOSOwbmfG7jRNqiGE2f62aISEIS2XVZE&page=${this.nextPage}&per_page=30`);
    this.photos.push(...photos);
    this.incrementPage();
  }

  constructor() {
    makeObservable(this, {
      photos: observable,
      nextPage: observable,
      fetchPhotos: action.bound,
      setPhotos: action,
      incrementPage: action,
    });
  }
}

export const store = new PhotosStore();

// injectStores({
//   store,
// });
