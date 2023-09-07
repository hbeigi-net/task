import HomePage from './pages/HomePage';
import { WithAppContext } from './store';

function App() {
  return (
    <WithAppContext>
      <div >
        <HomePage />
      </div>
    </WithAppContext>
  );
}

export default App;
