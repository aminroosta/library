import * as parsers from '../../src/api/parsers';
import * as values from './__mocks__/mocks';

it('should parse getByQuery result', () => {
  expect(parsers.parseGetByQuery(values.getByQuery)).toMatchSnapshot();
});

it('should parse getById result', () => {
  expect(parsers.parseGetById(values.getById)).toMatchSnapshot();
});

it('should parse getByIframe result', () => {
  expect(parsers.parseGetByIframe(values.getByIframe)).toMatchSnapshot();
});

it('should parse getReviewByUrl result', () => {
  expect(parsers.parseGetReviewByUrl(values.getReviewByUrl)).toMatchSnapshot();
});


