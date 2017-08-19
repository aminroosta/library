import {ReviewType, ReviewItemType} from '../models/Review';
import cheerio from 'cheerio-without-node-native';
import {USER_AGENT} from '../common/constants';

const GOODREAD_REVIEWS_URL = `https://www.goodreads.com/book/title`;

export const review = async title => {
   const response = await fetch(`${GOODREAD_REVIEWS_URL}?title=${title}`, {
      method: 'GET',
      headers: { 'User-Agent': USER_AGENT }, 
   });

   const html = await response.text();
   const result = parseGoodread(html);

   return result;
};

const parseGoodread = html => {
  const $ : CheerioStatic = cheerio.load(html);
  
  const reviews: ReviewItemType[] = $('article.bookReview.h-review').toArray().map(review => {
    const $review = $(review);
    return {
      id: $review.attr('id').replace('review_', 'review_item_'),
      userIcon: $review.find('.bookReviewerIcon img.userIcon').attr('src'),
      name: $review.find('.bookReviewHeading .reviewersName').text(),
      stars: $review.find('.staticStars .staticStar.p10').length,
      timestamp: $review.find('.updateTimestamp').text(),
      link: $review.find('.bookReviewBody a').attr('href'),
      body: $review.find('.bookReviewBody').text().replace('Read full review', '').trim()
    }
  }).filter(review => !review.link.startsWith('/review/show'));

  $('.bookDescription .fullContent').find('a.jsHide').remove();
  const result : ReviewType = {
    id: $('.bookUserRatingAction .ratingComponent').attr('id').replace('ratingComponent', '_review'),
    ratingAverage: $('.bookMetaInfo .bookRatingsAverage').text() as any * 1 || 0,
    ratingCount: $('.bookMetaInfo .bookRatingCount meta').attr('content') as any * 1 || 0,
    description: $('.bookDescription .fullContent').html(),
    reviews: reviews,
  };
  return result;
};
