import './App.css';
import Cell from './components/Cell/Cell.js';

function App() {


  const [state, setState] = useState([]);

  
  return (
    <div className="app">
      <Cell fill=""/>
      <Cell fill="red"/>
      <Cell fill="yellow"/>

    </div>
  );
}

export default App;
