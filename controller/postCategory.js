const { 
  postPostCategoryService,
 } = require('../services/postCategory');

const postPostCategory = async (id, categoryIds) => {
  const categories = categoryIds;
  const promises = categories.map(async (e) => { 
    const post = await postPostCategoryService(id, e);
    return post;
  });
  // const promiseAll = Promise.all(promises).then();

  Promise.all(promises).then();
  return promises;
};
     
module.exports = {
  postPostCategory,
};