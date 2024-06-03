const _B = function () {
  throw new Error("EO.JSH - Loop exceeded maximum allowed iterations");
};
const _L = 10;
async function handleRequest(_request) {
  let _C = 0;
  for (let i = 0; i < 5; i++) {
    _C++ > _L && _B();
    ;
  }
  let _C2 = 0;
  for (let i = 0; i < 110; i++) {
    _C2++ > _L && _B();
    try {
      console.log(`Loop iteration: ${i}`);
    } catch {}
  }
  let _C3 = 0;
  for (let j = 0; j < 5; j++) {
    _C3++ > _L && _B();
    console.log(`Loop iteration: ${j}`);
  }
  let _C4 = 0;
  for (let i = 0; i < 5; i++) {
    _C4++ > _L && _B();
    let _C5 = 0;
    for (let j = 0; j < 3; j++) {
      _C5++ > _L && _B();
      console.log(`Double loop iteration: i=${i}, j=${j}`);
    }
  }
  let _C6 = 0;
  for (let i = 0; i < 5; i++) {
    _C6++ > _L && _B();
    let _C7 = 0;
    for (let j = 0; j < 3; j++) {
      _C7++ > _L && _B();
      let _C8 = 0;
      for (let k = 0; k < 2; k++) {
        _C8++ > _L && _B();
        console.log(`Triple loop iteration: i=${i}, j=${j}, k=${k}`);
      }
    }
  }
  let i = 0;
  let _C9 = 0;
  do {
    _C9++ > _L && _B();
    console.log(`do...while loop iteration: i=${i}`);
    i++;
  } while (i < 5);
  const iterable = [10, 20, 30];
  let _C10 = 0;
  for (let value of iterable) {
    _C10++ > _L && _B();
    value += 1;
    console.log(value);
  }
  iterable.forEach(value => {
    console.log(value);
  });
  const object = {
    a: 1,
    b: 2,
    c: 3
  };
  let _C11 = 0;
  for (const property in object) {
    _C11++ > _L && _B();
    console.log(`${property}: ${object[property]}`);
  }
  let n = 0;
  let _C12 = 0;
  while (n < 3) {
    _C12++ > _L && _B();
    console.log(n);
    n++;
  }
  try {
    console.log('test');
  } catch (e) {
    console.log('error');
  }
  return new Response('Check the console for loop output.');
}
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});