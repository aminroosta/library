import {getByQuery, getById} from '../../src/api/GoodRead';

it('getByQuery works', async () => {
  const data = await getByQuery('love');
  expect(data && data.length).toBeTruthy();
});

it('getById works', async () => {
  const data = await getById(19501);
  expect(data && data.length).toBeTruthy();
});

