'use strict'

module.exports = function (Product) {

  const validQuantity = quantity => quantity > 0

  Product.validatesLengthOf('name', {
    min: 3,
    max: 30,
    message: {
      min: 'name should be at least 3 characters long',
      max: 'name should be at most 30 characters long'
    }
  })

  Product.validatesUniquenessOf('name')

  const positiveIntegerRegex = /^[0-9]*$/

  const validatePositiveInteger = function (err) {
    if (!positiveIntegerRegex.test(this.price)) {
      err()
      return
    }
  }

  Product.validate('price', validatePositiveInteger, {
    message: 'price should be a positive integer'
  })

  function validateMinimalPrice (err, done) {
    const { price } = this

    process.nextTick(() => {
      if (price < 99) {
        err()
      }
      done()
    })
  }

  Product.validateAsync('price', validateMinimalPrice, {
    message: 'price should be greater'
  })

  /**
   * Buy this product
   * @param {number} quantity Number of products to buy
   * @param {Function(Error, object)} callback
   */
  Product.prototype.buy = function(quantity, callback) {
    if (!validQuantity(quantity)) {
      return callback(`invalid quantity ${quantity}`)
    }

    const result = {
      status: `bought ${quantity} product(s)`
    }
    callback(null, result)
  }
}
