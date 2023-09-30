import './App.css';
import LeaveMessage from './components/LeaveMessage/LeaveMessage';

function App() {
  return (
    <div className="App">
      <h1>Coming Soon!</h1>
      <div className='row'>
        <div className='col-lg-6'></div>
        <div className='col-lg-6 col-sm-12 pt-5'>
          <h3>Leave a message so I know this URL is getting attention!</h3>
          <LeaveMessage />
        </div>
      </div>
    </div>
  );
}

export default App;
