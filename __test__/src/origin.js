async function handleRequest(_request) {
  for (let i = 0; i < 5; i++);

  for (let i = 0; i < 110; i++) {
    try {
      console.log(`Loop iteration: ${i}`);
    } catch {}
  }

  for (let j = 0; j < 5; j++) {
    console.log(`Loop iteration: ${j}`);
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      console.log(`Double loop iteration: i=${i}, j=${j}`);
    }
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 2; k++) {
        console.log(`Triple loop iteration: i=${i}, j=${j}, k=${k}`);
      }
    }
  }

  let i = 0;
  do {
    console.log(`do...while loop iteration: i=${i}`);
    i++;
  } while (i < 5);

  const iterable = [10, 20, 30];
  for (let value of iterable) {
    value += 1;
    console.log(value);
  }

  iterable.forEach(value => {
    console.log(value);
  })

  const object = { a: 1, b: 2, c: 3 };
  for (const property in object) {
    console.log(`${property}: ${object[property]}`);
  }

  let n = 0;
  while (n < 3) {
    console.log(n);
    n++;
  }

  try {
    console.log('test');
  } catch(e) {
    console.log('error');
  }

  return new Response('Check the console for loop output.');
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
