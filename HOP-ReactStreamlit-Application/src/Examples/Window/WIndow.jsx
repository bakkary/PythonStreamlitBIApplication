// Accessing the current URL
const currentURL = window.location.href;
console.log('Current URL:', currentURL);

// Alerting the user
window.alert('Hello, World!');

// Opening a new window
const newWindow = window.open('https://www.example.com', '_blank', 'width=500,height=500');
// This will open a new window with Example.com and set its dimensions.

// Accessing the screen dimensions
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
console.log('Screen Width:', screenWidth, 'Screen Height:', screenHeight);

// Handling resize event
window.addEventListener('resize', () => {
  console.log('Window resized!');
});


// Using document.getElementById to manipulate the DOM
const myElement = document.getElementById('exampleElement');

// Check if the element exists
if (myElement) {
  // Modify the element's properties or content
  myElement.textContent = 'Hello from document.getElementById!';
  myElement.style.color = 'blue';
}
