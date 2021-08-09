const pagination = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  try {
    if (endIndex < (await model.countDocuments())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await model.find().limit(limit).skip(startIndex).exec();

    res.paginatedResults = results;

    res.paginatedResult = {
      success: true,
      next: results.next,
      previous: results.previous,
      data: results.results,
    };
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = pagination;
