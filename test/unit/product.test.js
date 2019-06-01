const {
  app,
  expect
} = require('../common')

const { Product } = app.models

describe('custom methods', () => {

  it('should allow buying a product', () => {
    const product = new Product({
      name: 'Apple',
      price: 99
    })
    return product.buy(10, (error, response) => {
      expect(response.status).to.contain('bought 10 product(s)')
    })
  })

  it('should not allow buying a negative amount of products', () => {
    const product = new Product({
      name: 'Apple',
      price: 99
    })
    return product.buy(-1, (error, response) => {
      expect(error).to.contain('invalid quantity')
    })
  })
})

describe('validation', () => {

  it('should reject a name < 3 characters long', () => {
    return Product.create({ name: 'Ap', price: 99 })
      .then(response => {
        Promise.reject('product should not be created')
      })
      .catch(error => {
        expect(error.message).to.contain('name should be at least 3 characters long')
        expect(error.statusCode).to.be.equal(422)
      })
  })

  it('should reject a name > 30 characters long', () => {
    return Product.create({ name: 'This is an Apple with a long name', price: 99 })
      .then(response => {
        Promise.reject('product should not be created')
      })
      .catch(error => {
        expect(error.message).to.contain('name should be at most 30 characters long')
        expect(error.statusCode).to.be.equal(422)
      })
  })

  it('should reject a price < 99', () => {
    return Product.create({ name: 'Apple', price: 50 })
      .then(response => {
        throw new Error('product should not be created')
      })
      .catch(error => {
        expect(error.message).to.contain('price should be greater')
        expect(error.statusCode).to.be.equal(422)
      })
  })
})

describe('hooks', () => {

  it('should not allow adding a product to a non-existant category', () => {
    return Product.create({
      name: 'Apple',
      price: 99,
      categoryId: 99
    })
      .then(response => {
        throw new Error('product should not be created')
      })
      .catch(error => {
        expect(error).to.contain('error adding a product to a non-existant category')
      })
  })
})
