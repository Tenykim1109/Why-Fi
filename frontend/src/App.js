import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./pages/Homepage";

import Signup from './pages/account/Signup';
import Login from './pages/account/Login';
import Start from './pages/quiz/Start';
import Quiz from './pages/quiz/Quiz';
import Result from './pages/quiz/Result';
import Border from './components/Border';

import Stock from './pages/stock/Stock';

function App() {
  return (
    <Router>
      <Border>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route path='/quiz/start' element={<Start />} />
          <Route path='/quiz/' element={<Quiz />} />
          <Route path='/quiz/result' element={<Result />} />
          <Route path='/stock' element={<Stock/>} />
        </Routes>
      </Border>
    </Router>
    // <StockMain></StockMain>
  );
}

export default App;
