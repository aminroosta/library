import { AsyncStorage } from 'react-native';
import * as GoodRead from '../api/GoodRead';
import { json } from 'json-mobx';
import {observable, computed} from 'mobx';

export class ReviewComment {
  @json @observable id = '';
  @json @observable userIcon = '';
  @json @observable name = '';
  @json @observable stars = 0;
  @json @observable timestamp = '';
  @json @observable link = '';
  @json @observable body = '';
  dispose() { }
  public static async getByUrl(url: string) {
    const key = `@ReviewComment/${url}`;
    let cache = await AsyncStorage.getItem(key);
    cache = null;
    if(cache !== null) {
      const data : object[] = JSON.parse(cache);
      const comments = data.map(d => {
        const comment = new ReviewComment();
        json.load(comment, d);
        return comment;
      });
      return comments;
    }
    // Query the site if not cached yet.
    const data = await GoodRead.comments(url);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    const comments = data.map(d => {
      const comment = new ReviewComment();
      json.load(comment, d);
      return comment;
    });
    return comments;
  }
};

export class Review {
  @json @observable id = '';
  @json @observable ratingAverage = 0;
  @json @observable ratingCount = 0;
  @json @observable reviewCount = 0;
  @json @observable description = '';

  @json @observable reviewsLink = '';
  @observable private _comments?: ReviewComment[] = null;

  @computed get comments() {
    const url = this.reviewsLink;
    if(this._comments)
      return this._comments;
    ReviewComment.getByUrl(url).then(comments => this._comments = comments);
    return null;
  }

  public static async getByTitle(title: string) {
    const key = `@Review/${title}`;
    const review = new Review();
    let cache = await AsyncStorage.getItem(key);
    cache = null;
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
