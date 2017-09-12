import cheerio from 'cheerio-without-node-native';
import {Review, ReviewComment} from '../models/Review';

export const parseSearchByQuery = xml => {

};

export const parseGoodreadXml = xml => {
  const regex = /<!\[CDATA\[([\s\S]*?)\]\]>(?=\s*<)/gi;
  const filteredXml = xml.replace(regex, '$1');
  const $ : CheerioStatic = cheerio.load(filteredXml, {xmlMode: true});

  const err = $('error');
  if (err.length) { throw new Error(err.text()); }

  const $book = $('book');
  const result : Review = {
    id: $book.find('> id').text(),
    description: $book.find('> description').html().trim(),
    ratingAverage: $book.find('> average_rating').text() as any * 1,
    ratingCount: $book.find('> rating_count').text() as any * 1,
    reviewCount: $book.find('> text_reviews_count').text() as any * 1,
    reviewsLink: $book.find('> reviews_widget #the_iframe').attr('src'),
    comments: [],
  };
  return result;
};

export const parseGoodreadHtml = html => {
  const $ : CheerioStatic = cheerio.load(html);
  
  return [];
  // const reviews = $('article.bookReview.h-review').toArray().map(review => {
  //   const $review = $(review);
  //   return {
  //     id: $review.attr('id').replace('review_', 'review_item_'),
  //     userIcon: $review.find('.bookReviewerIcon img.userIcon').attr('src'),
  //     name: $review.find('.bookReviewHeading .reviewersName').text(),
  //     stars: $review.find('.staticStars .staticStar.p10').length,
  //     timestamp: $review.find('.updateTimestamp').text(),
  //     link: $review.find('.bookReviewBody a').attr('href'),
  //     body: $review.find('.bookReviewBody').text().replace('Read full review', '').trim()
  //   } as ReviewItem;
  // }).filter(review => review.link && !review.link.startsWith('/review/show'));

  // $('.bookDescription .fullContent').find('a.jsHide').remove();
  // const result : Review = {
  //   id: $('.bookUserRatingAction .ratingComponent').attr('id').replace('ratingComponent', '_review'),
  //   ratingAverage: $('.bookMetaInfo .bookRatingsAverage').text() as any * 1 || 0,
  //   ratingCount: $('.bookMetaInfo .bookRatingCount meta').attr('content') as any * 1 || 0,
  //   description: $('.bookDescription .fullContent').html(),
  //   reviews: reviews as any,
  // };
  // return result;
}; 
