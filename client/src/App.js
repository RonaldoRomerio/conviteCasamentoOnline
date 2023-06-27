import './App.css';
import Router from './Router';
import SwalProviderContext from './Context/SwalContext'
import AuthProviderContext from './Context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (
      <SwalProviderContext>
        <AuthProviderContext>
          <div className="App">
            <Router/>
          </div>
        </AuthProviderContext>
      </SwalProviderContext>
    );
}

export default App;
