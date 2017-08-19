import { types } from 'mobx-state-tree';

const ReviewItem = types.model(
  'ReviewItem', {
    id: types.string,
    userIcon: types.string,
    name: types.string,
    stars: types.number,
    timestamp: types.string,
    link: types.string,
    body: types.string
  }, {
  }
);

const Review = types.model(
   'Review', {
      id: types.string,
      ratingAverage: 0,
      ratingCount: 0,
      description: '',
      reviews: types.array(ReviewItem)
   }, {
   }
);

export interface ReviewItemType {
  id: string,
  userIcon: string,
  name: string,
  stars: number,
  timestamp: string,
  link: string,
  body: string
}
export interface ReviewType {
  id: string,
  ratingAverage: number,
  ratingCount: number,
  description: string,
  reviews: ReviewItemType[]
}

export default Review;
