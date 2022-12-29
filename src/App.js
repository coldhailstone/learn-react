function App() {
  const number = 1;

  function double(number) {
    return number * 2;
  };

  function printHello() {
    console.log('hello');
  }

  return (
    <>
      <div>{double(number)}</div>
      <button onClick={printHello}>Submit</button>
    </>
  );
}

export default App;
