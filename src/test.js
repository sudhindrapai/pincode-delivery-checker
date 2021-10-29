let inputValue = 5;

let outputDivRef = document.getElementById("outPUt");

const createDivs = () => {
    let view = "";
for (let i=0;i<=inputValue; i++) {
    let inputView = `<div>${i}</div>`;
    view += inputView
}
outputDivRef.html = view

};


function createIncrement() {
    let count = 0;
    function increment() {
      count++;
    }
    let message = `Count is ${count}`;
    function log() {
      
      console.log(message);
    }
  
    return [increment, log];
  }
  
  const [increment, log] = createIncrement();
  increment();
  increment();
  increment();
  log(); // What is logged?