const {
  app,
  expect,
  request
} = require('../common')
const httpStatus = require('http-status')

describe('acl', () => {

  describe('category', () => {

    it('should return 200 OK when listing categories', () => {
      return request
        .get('/api/categories')
        .expect(httpStatus.OK)
    })

    it('should return 401 UNAUTHORIZED when creating categories', () => {
      return request
        .post('/api/categories')
        .send({
          name: 'Test Category'
        })
        .expect(httpStatus.UNAUTHORIZED)
    })

    it('should return a 401 UNAUTHORIZED when updating categories', () => {
      return request
        .patch('/api/categories/1')
        .send({
          name: 'Test Category 2'
        })
        .expect(httpStatus.UNAUTHORIZED)
    })

    it('should return a 401 UNAUTHORIZED when deleting categories', () => {
      return request
        .delete('/api/categories/1')
        .expect(httpStatus.UNAUTHORIZED)
    })
  })

  describe('product', () => {

    it('should return 200 OK when listing products', () => {
      return request
        .get('/api/products')
        .expect(httpStatus.OK)
    })

    it('should return 401 UNAUTHORIZED when creating products', () => {
      return request
        .post('/api/products')
        .send({
          name: 'Test Product'
        })
        .expect(httpStatus.UNAUTHORIZED)
    })

    it('should return a 401 UNAUTHORIZED when updating products', () => {
      return request
        .patch('/api/products/1')
        .send({
          name: 'Test Product 2'
        })
        .expect(httpStatus.UNAUTHORIZED)
    })

    it('should return a 401 UNAUTHORIZED when deleting products', () => {
      return request
        .delete('/api/products/1')
        .expect(httpStatus.UNAUTHORIZED)
    })

    it('should return a 200 OK when buying a product', () => {
      return app.models.Product
        .create({
          name: 'Test Product',
          price: 99
        })
        .then(product => {
          return request
            .post(`/api/products/${product.id}/buy`)
            .send({
              quantity: 10
            })
            .expect(httpStatus.OK)
        })
    })
  })
})
