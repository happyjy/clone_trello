Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(days + date.getDate());
  return date;
}

const debounce = (func, delay) => {
  /* 
    # debounce의 원리 
      * setTimeout에 설정힌 delay 시간 초 이전에 debounce가 수행되면 clearTimeout에 의해서 제거 된다.(func이 동작하지 않는다.
  */
  let timeoutId = null;
  debugger;
  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};

const throttle = (func, delay) => {
  let throttled = false;
  debugger;
  return (...args) => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        func(...args);
        throttled = false;
      }, delay);
    }
  };
};