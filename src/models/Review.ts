import { AsyncStorage } from 'react-native';
import { types } from 'mobx-state-tree';
import {GoodRead}  from '../api/api';

const ReviewItemModel = types.model('ReviewItem', {
  id: types.string,
  userIcon: types.string,
  name: types.string,
  stars: types.number,
  timestamp: types.string,
  link: '',
  body: types.string,
})
.views(model => ({ }))
.actions(model => ({ }));

const ReviewModel = types.model('Review', {
  id: types.string,
  ratingAverage: 0,
  ratingCount: 0,
  description: '',
  reviews: types.array(ReviewItemModel)
});

const extensions = {
  async getByTitle(title: string) {
    const key = `@Review/${title}`;
    const cache = await AsyncStorage.getItem(key);
    if(cache !== null) {
      const review = JSON.parse(cache);
      return ReviewModel.create(review);
    }
    // Query the site if not cached yet.
    const review = await GoodRead.review(title);
    await AsyncStorage.setItem(key, JSON.stringify(review));
    return ReviewModel.create(review);
  }
};

export const Review = Object.assign(ReviewModel, extensions);
export const ReviewItem = ReviewItemModel;
