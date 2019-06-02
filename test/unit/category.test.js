const {
  app,
  expect
} = require('../common')

const {
  Category,
  Product
} = app.models

describe('category', () => {

  describe('hooks', () => {

    it('should not allow deleting a category with products', () => {
      return Promise.resolve()
        .then(() => Category.create({ name: 'Tea' }))
        .then(category => Product.create({ name: 'Green Tea', price: 199, categoryId: category.id }))
        .then(product => Category.destroyById(product.categoryId))
        .then(response => {
          throw new Error('the category was deleted')
        })
        .catch(error => expect(error).to.equal('error deleting category with products'))
    })
  })
})
