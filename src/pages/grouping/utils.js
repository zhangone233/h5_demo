const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。 
 * 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的。
 * 每个键对应的值负责生成 key 的元素组成的数组。iteratee 调用 1 个参数： (value)。
 *
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 */
export const groupBy = (collection, iteratee) => {
  return collection.reduce((result, item) => {
    const key = iteratee(item)
    if (hasOwnProperty.call(result, key)) {
      result[key].push(item)
    } else {
      result[key] = [item];
    }
    return result
  }, {})
}