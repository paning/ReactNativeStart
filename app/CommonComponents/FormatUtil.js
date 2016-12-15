export const formatTimestamp = (timestamp) => {
  const date = new Date(parseInt(timestamp) * 1000);
  const year = date.getFullYear();
  const month = parseInt(date.getMonth()) + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const formatDateString = date =>
   date.substring(0, 10)
;

export const formatStringWithHtml = (originString) => {
  const newString = originString.replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  return newString;
};

export const formatDate = (date, format) => {
  const paddNum = (num) => {
    num += '';
    return num.replace(/^(\d)$/, '0$1');
  };

  const cfg = {
    yyyy: date.getFullYear(), // 年 : 4位
    yy: date.getFullYear().toString().substring(2), // 年 : 2位
    M: date.getMonth() + 1,  // 月 : 如果1位的时候不补0
    MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
    d: date.getDate(),   // 日 : 如果1位的时候不补0
    dd: paddNum(date.getDate()), // 日 : 如果1位的时候补0
    hh: paddNum(date.getHours()),  // 时
    mm: paddNum(date.getMinutes()), // 分
    ss: paddNum(date.getSeconds()), // 秒
  };
  format || (format = 'yyyy-MM-dd hh:mm:ss');

  return format.replace(/([a-z])(\1)*/ig, m => cfg[m]);
};
