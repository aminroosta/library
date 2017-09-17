import 'react-native';
import React from 'react';
import {searchByQuery} from '../../src/api/GoodRead';

test('searchByQuery returns an array', async () => {
  const data = await searchByQuery('love');
  expect(Array.isArray(data)).toBe(true);
});

