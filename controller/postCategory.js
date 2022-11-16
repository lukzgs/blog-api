const { 
  postPostCategoryService,
 } = require('../services/postCategory');

const postPostCategory = async (id, categoryIds) => {
  const categories = categoryIds;
  const promises = categories.map(async (e) => { 
    const post = await postPostCategoryService(id, e);
    return post;
  });

  Promise.all(promises).then();
  return promises;
};
     
module.exports = {
  postPostCategory,
};