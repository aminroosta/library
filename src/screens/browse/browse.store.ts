import {observable, action, runInAction} from 'mobx';
import {throttle} from 'lodash';
import * as Api from '../../api/Google';

export default class BrowseStore {
  @observable query =  '';
  @observable suggestions = [];

  @action.bound setQuery(q: string) {
    this.query = q;
  }

  @action.bound search = async () => {
    const results = await Api.search(this.query);
    console.warn(results);
  }
  @action.bound complition = throttle(async () => {
    const suggestions = await Api.complition(this.query);
    runInAction(() => this.suggestions = suggestions);
  });
}
