// compose
const compose = (...[first, ...other]) => (...args) => {
  let ret = first(...args);
  other.forEach((fn) => {
    ret = fn(ret);
  });
  return ret;
};

const add = (x, y) => x + y;
const square = (z) => z * z;

const fn = compose(add, square);
console.log('函数计算：', fn(1, 2));

// middleware
const compose2 = (middleware) => {
  return function (ctx) {
    // 执行第一个
    return dispatch(0);
    function dispatch(i) {
      let fn = middleware[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(ctx, function next() {
          // 执行下一个
          return dispatch(i + 1);
        })
      );
    }
  };
};

const fn1 = async (ctx, next) => {
  console.log("fn1");
  await next();
  console.log("end fn1");
};
const fn2 = async (ctx, next) => {
  console.log("fn2");
  await delay();
  await next();
  console.log("end fn2");
};
const fn3 = async (ctx, next) => {
  console.log("fn3");
  await next();
  console.log("end fn3");
};
function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

const middleware = [fn1, fn2, fn3];
const finalFn = compose2(middleware);
// finalFn();


module.exports = {
  compose2: compose2,
};