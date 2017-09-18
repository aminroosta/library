import cheerio from 'cheerio-without-node-native';
import Book from '../../src/models/Book';

export const parseGetByQuery = (xml : string) => {
  const regex = /<!\[CDATA\[([\s\S]*?)\]\]>(?=\s*<)/gi;
  const filteredXml = xml.replace(regex, '$1');
  const $ : CheerioStatic = cheerio.load(filteredXml, {xmlMode: true});

  const works = $('GoodreadsResponse > search > results > work');

  const books = works.map((inx, work) => {
    const $work = $(work);
    const $best_book = $work.find('> best_book');
    return {
      id: $best_book.find('> id').text(),
      ratingAverage: +$work.find('> average_rating').text(),
      title: $best_book.find('> title').text(),
      author: {
        id: $best_book.find('> author > id').text(),
        name: $best_book.find('> author > name').text(),
      },
      thumbnail: $best_book.find('> image_url').text(),
      smallThumbnail: $best_book.find('> small_image_url').text(),
    };
  }).toArray();

  return books;
};

export const parseGetById = (xml : string) => {
  const regex = /<!\[CDATA\[([\s\S]*?)\]\]>(?=\s*<)/gi;
  const filteredXml = xml.replace(regex, '$1');
  const $ : CheerioStatic = cheerio.load(filteredXml, {xmlMode: true});

  const book = $('GoodreadsResponse > book');
  const work = book.find('> work');

  return {
    id: book.find('> id').text(),
    title: book.find('> title').text(),
    isbn10: book.find('> isbn').text(),
    isbn13: book.find('> isbn13').text(),
    description: book.find('> description').text(),
    thumbnail: book.find('> image_url').text(),
    smallThumbnail: book.find('> small_image_url').text(),
    publisher: book.find('> publisher').text(),
    ratingAverage: +book.find('> average_rating').text(),
    numPages: +book.find('> num_pages').text(),
    ratingsCount: +book.find('> ratings_count').text(),
    reviewsCount: +book.find('> text_reviews_count').text(),
    reviewsLink: book.find('> reviews_widget #the_iframe').attr('src'),
    publicationYear: book.find('> publication_year').text() ||
                   work.find('> original_publication_year').text(),
    authors: book.find('> authors > author')
                 .map((inx, author) => ({
                   id: $(author).find('> id').text(),
                   name: $(author).find('> name').text(),
                   thumbnail: $(author).find('> image_url').text(),
                   smallThumbnail: $(author).find('> small_image_url').text(),
                 }))
                 .toArray(),
  };
};

export const parseGetByIframe = (html: string) => {
  const $ : CheerioStatic = cheerio.load(html);

  const rows = $('.gr_reviews_container > .gr_review_container');

  const result = rows.map((inx, row) => {
    const $row = $(row);
    const body = $row.find('> .gr_review_text');
    const link = body.find('> .gr_more_link').remove();
    body.find('link').remove();

    return {
      name: $row.find('> .gr_review_by > a').text(),
      rating: ($row.find('> .gr_rating').text().match(/★/g) || []).length,
      timestamp: $row.find('> .gr_review_date').text().trim(),
      body: body.html().trim(),
      link: link.attr('href'),
    };
  }).toArray();
  
  return result;
};

export const parseGetReviewByUrl = (html: string) => {
  const $ : CheerioStatic = cheerio.load(html);

  const pageContent = $('body .pageContent');
  const feedItem = pageContent.find('> .feedItem');

  return {
    // avatar: feedItem.find('> .feedItemAvatar').css('background-image'),
    // t: !!pageContent.html(),
  };
};

export const parseGoodreadXml = xml => {
  const regex = /<!\[CDATA\[([\s\S]*?)\]\]>(?=\s*<)/gi;
  const filteredXml = xml.replace(regex, '$1');
  const $ : CheerioStatic = cheerio.load(filteredXml, {xmlMode: true});

  const err = $('error');
  if (err.length) { throw new Error(err.text()); }

  const $book = $('book');
  const result = {
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
}; 
