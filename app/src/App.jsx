import Home from './Pages/Home';
import SignUpPage from './Pages/SignUpPage';
import ProfilePhotoPage from './Pages/ProfilePhotoPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {DragProvider} from './utils/GlobalContext';
import {Analytics} from '@vercel/analytics/react'

function App() {
  return ( 
    <DragProvider>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<SignUpPage/>}/>
            <Route path="/profilepicture" element={<ProfilePhotoPage/>}/>
          </Routes>
        </BrowserRouter>
      </main> 
      <Analytics/>
    </DragProvider>
  );
}

export default App;