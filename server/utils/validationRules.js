const vietnamesePhoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const isVietnamesePhone = (phone) => vietnamesePhoneRegex.test(String(phone || '').replace(/[.\s-]/g, ''));

module.exports = { vietnamesePhoneRegex, isVietnamesePhone };