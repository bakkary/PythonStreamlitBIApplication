function processUserData({ name, age, ...rest }) {
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
  console.log('Additional data:', rest);
}

const userData = {
  name: 'John',
  age: 30,
  gender: 'male',
  country: 'USA',
  hobbies: ['reading', 'coding']
};

processUserData(userData);

const numbers = [1, 2, 3, 4, 5];

const [first, ...restOfNumbers] = numbers;
console.log(`First number: ${first}`);
console.log('Rest of numbers:', restOfNumbers);

function calculateSum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

const sum1 = calculateSum(1, 2, 3);
const sum2 = calculateSum(5, 10, 15, 20);

console.log(`Sum 1: ${sum1}`);
console.log(`Sum 2: ${sum2}`);
