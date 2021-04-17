const { booksRepository } = require('../../repositories');

module.exports = async (perPage, page) => {
  if (!perPage || Number.isNaN(perPage)) {
    perPage = 10;
  } else {
    perPage = parseInt(perPage, 10);
  }

  if (!page || Number.isNaN(page)) {
    page = 1;
  } else {
    page = parseInt(page, 10);
  }

  const books = await booksRepository.list({
    limit: perPage,
    offset: perPage * (page - 1),
  });

  return {
    totalPage: Math.ceil(books.count),
    items: books.rows,
  };
};
