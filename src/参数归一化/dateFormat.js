/**
 * 参数归一化: 把不同的情况转换成最终的一种情况，后续按照这一种情况进行处理
 *
 * 归一化函数
 * @param {any} formatter
 * @returns Function
 */
function _formatNormalize(formatter) {
  if (typeof formatter === 'function') {
    return formatter
  }
  if (typeof formatter !== 'string') {
    throw new TypeError('formatter must be a string')
  }
  if (formatter === 'date') {
    formatter = 'yyyy-MM-dd'
  } else if (formatter === 'datetime') {
    formatter = 'yyyy-MM-dd HH:mm:ss'
  }

  const formatterFunc = dateInfo => {
    const { yyyy, MM, dd, HH, mm, ss, ms } = dateInfo
    return formatter
      .replaceAll('yyyy', yyyy)
      .replaceAll('MM', MM)
      .replaceAll('dd', dd)
      .replaceAll('HH', HH)
      .replaceAll('mm', mm)
      .replaceAll('ss', ss)
      .replaceAll('ms', ms)
  }

  return formatterFunc
}

/**
 * 格式化一个日期
 * @param {*} date 日期对象
 * @param {*} formatter
 * @param {*} isPad
 */
function formate(date, formatter, isPad = false) {
  formatter = _formatNormalize(formatter)
  const dateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    miniSecond: date.getMilliseconds()
  }
  dateInfo.yyyy = dateInfo.year.toString()
  dateInfo.MM = dateInfo.month.toString()
  dateInfo.dd = dateInfo.date.toString()
  dateInfo.HH = dateInfo.hour.toString()
  dateInfo.mm = dateInfo.minute.toString()
  dateInfo.ss = dateInfo.second.toString()
  dateInfo.ms = dateInfo.miniSecond.toString()

  function _pad(prop, len) {
    dateInfo[prop] = dateInfo[prop].padStart(len, '0')
  }
  if (isPad) {
    _pad('yyyy', 4)
    _pad('MM', 2)
    _pad('dd', 2)
    _pad('HH', 2)
    _pad('mm', 2)
    _pad('ss', 2)
    _pad('ms', 3)
  }
  const result = formatter(dateInfo)
  console.log(result)
  return result
}

// 可能的调用方式
formate(new Date(), 'date') // 2023-4-6
formate(new Date(), 'datetime') // 2023-4-6 14:7:41

formate(new Date(), 'date', true) // 2023-04-06
formate(new Date(), 'datetime', true) // 2023-04-06 14:07:41

formate(new Date(), 'yyyy年MM月dd日 HH:mm:ss.ms', true) // 2023年04月06日 14:07:41.336

// 2023年4月6日 14:7:41.336
formate(new Date('2022/1/1'), dateInfo => {
  const { year } = dateInfo
  const thisYear = new Date().getFullYear()
  if (year < thisYear) {
    return `${thisYear - year}年前`
  } else if (year > thisYear) {
    return `${year - thisYear}年后`
  } else {
    return '今年'
  }
})
