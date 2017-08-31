import { AsyncStorage } from 'react-native';
import {GoodRead}  from '../api/api';
import { json } from 'json-mobx';
import {observable, computed} from 'mobx';

export class ReviewItem {
  @json @observable id = '';
  @json @observable userIcon = '';
  @json @observable name = '';
  @json @observable stars = 0;
  @json @observable timestamp = '';
  @json @observable link = '';
  @json @observable body = '';
  dispose() { }
};

export class Review {
  @json @observable id = '';
  @json @observable ratingAverage = 0;
  @json @observable ratingCount = 0;
  @json @observable description = '';
  @json readonly reviews = json.arrayOf(ReviewItem)

  public static async getByTitle(title: string) {
    const key = `@Review/${title}`;
    const review = new Review();
    let cache = await AsyncStorage.getItem(key);
    if(cache !== null) {
      const data = JSON.parse(cache);
      json.load(review, data);
      return review;
    }
    // Query the site if not cached yet.
    const data = await GoodRead.review(title);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    json.load(review, data);
    return review;
  }
}
