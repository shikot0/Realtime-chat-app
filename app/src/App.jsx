import Home from './Pages/Home';
import SignUpPage from './Pages/SignUpPage';
import ProfilePhotoPage from './Pages/ProfilePhotoPage';
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
            <Route path="/profilephoto" element={<ProfilePhotoPage/>}/>
          </Routes>
        </BrowserRouter>
      </main> 
    </DragProvider>
  );
}

export default App;