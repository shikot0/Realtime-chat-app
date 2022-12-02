import Home from './Pages/Home';
import SignUpPage from './Pages/SignUpPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {DragProvider} from './utils/GlobalContext';

function App() {
  return ( 
    <DragProvider>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<SignUpPage/>}/>
          </Routes>
        </BrowserRouter>
      </main> 
    </DragProvider>
  );
}

export default App;