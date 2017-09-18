import * as utils from 'src/common/utils';
import * as goodread from 'src/api/GoodRead';
import * as parsers from 'src/api/parsers';

export const getByQuery = utils.memoize(async (query:string) => {
  const text = await goodread.getByQuery(query);
  return parsers.parseGetByQuery(text);
});

export const getById = utils.memoize(async (id:string|number) => {
  const text = await goodread.getById(id);
  return parsers.parseGetById(text);
});

