// Higher-Order Function (HOF)
const multiplyBy = (multiplier) => {
    // The returned function is the closure
    return (number) => {
      return number * multiplier;
    };
  };
  
  // Using the Higher-Order Function to create a new function
  const multiplyByTwo = multiplyBy(2);
  
  // Using the returned function
  console.log(multiplyByTwo(5)); // Output: 10
  console.log(multiplyByTwo(8)); // Output: 16
  
  // Creating another function with a different multiplier
  const multiplyByThree = multiplyBy(3);
  
  console.log(multiplyByThree(5)); // Output: 15
  console.log(multiplyByThree(8)); // Output: 24
  