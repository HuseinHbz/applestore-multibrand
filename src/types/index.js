// Domain Types (JSDoc for type safety in JS)

/**
 * @typedef {Object} Brand
 * @property {string} id
 * @property {string} name
 * @property {string} logo
 * @property {string} primaryColor
 * @property {string} currency
 * @property {string} slogan
 * @property {string} domain
 */

/**
 * @typedef {Object} Branch
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {string} phone
 * @property {string} hours
 * @property {{lat: number, lng: number}} location
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} category
 * @property {string} brand
 * @property {string[]} images
 * @property {Object} specs
 * @property {string} description
 */

/**
 * @typedef {Object} Variant
 * @property {string} id
 * @property {string} productId
 * @property {string} color
 * @property {string} storage
 * @property {number} price
 * @property {string} sku
 */

/**
 * @typedef {Object} CartItem
 * @property {string} variantId
 * @property {number} quantity
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {'customer'|'staff'|'manager'|'admin'} role
 * @property {string[]} addresses
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {OrderItem[]} items
 * @property {string} status
 * @property {number} total
 * @property {string} createdAt
 */

/**
 * @typedef {Object} OrderItem
 * @property {string} variantId
 * @property {number} quantity
 * @property {number} price
 */

export {}
