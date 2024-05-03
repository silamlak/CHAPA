import { useState } from 'react'
import Payment from './Payment';
import PaymentM from './mern/PaymentM';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PaymentM />
    </>
  );
}

export default App
