import { useState } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [converted, setConverted] = useState(0);

  const currencyinfo = useCurrencyInfo(from);
  const allCurrencies = currencyinfo ? Object.keys(currencyinfo.rates) : [];

  const fromOptions = [...new Set([from, ...allCurrencies])]; // Ensures "from" currency is always included
  const toOptions = allCurrencies.filter((currency) => currency !== from); // Removes "from" currency from "to" options

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConverted(amount);
    setAmount(converted);
  };

  const convert = () => {
    setConverted(amount * (currencyinfo.rates[to] || 1));
  };

  return (
    <>
      <div className=' bg-gray-800 h-[90px] flex justify-center items-center '>
        <h1 className='text-white text-4xl font-bold'>XchangeNow</h1>
      </div>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/5466785/pexels-photo-5466785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyoptions={fromOptions}
                  oncurrencychange={(currency) => setFrom(currency)}
                  selectcurrency={from}
                  onamountchange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={converted}
                  currencyoptions={toOptions}
                  oncurrencychange={(currency) => setTo(currency)}
                  selectcurrency={to}
                />
              </div>
              <button type="submit" 
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                Convert
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
