import './App.css';
import Header from './components/Header';
import Charts from './pages/Charts';
import Transactions from './pages/Transactions';

function App() {
  return (
    <div className="bg-blue-100 pb-10">
      <Header />
      <Transactions />
      <Charts />
    </div>
  );
}

export default App;
