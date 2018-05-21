/**
 * 根据currency切换币种
 * @param {*} cr
 * @param {*} money
 */
export const convertCurrency = (cr, money) => {
  const string = `${cr === 'RMB' ? '¥' : '$'}${money}`
  return string
}
