'use strict';

module.exports = function(Category) {

  Category.observe('before delete', context => {
    return Category.app.models.Product
      .count({ categoryId: context.where.id })
      .then(productsCount => {
        if (productsCount > 0) {
          return Promise.reject('error deleting category with products')
        }
      })
  })
};
