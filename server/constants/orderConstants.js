const ORDER_STATUS = Object.freeze({
  CREATED: 'CREATED',
  ASSIGNED: 'ASSIGNED',
  SHIPPING: 'SHIPPING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
});

const PRODUCT_TYPES = Object.freeze(['normal', 'fragile', 'heavy', 'bulky']);
const WEIGHT_RANGES = Object.freeze(['0-2kg', '2-5kg', '5-10kg', '10kg+']);

module.exports = { ORDER_STATUS, PRODUCT_TYPES, WEIGHT_RANGES };