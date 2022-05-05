import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./pages/Homepage";

import Signup from './pages/account/Signup';
import Login from './pages/account/Login';
import Start from './pages/quiz/Start';
import Quiz from './pages/quiz/Quiz';
import Result from './pages/quiz/Result';
import Border from './components/Border';

import Tutorial from './pages/bankbook/Tutorial';
import MakeDeposit from './pages/bankbook/MakeDeposit';
import MakeSavings from './pages/bankbook/MakeSavings';
import Success from './pages/bankbook/Success';

function App() {
  return (
    <Router>
      <Border>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route path='/quiz/start' element={<Start />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/quiz/result' element={<Result />} />

          <Route path='/tutorial' element={<Tutorial />} />
          <Route path='/tutorial/success' element={<Success />} />
          <Route path='/deposit/start' element={<MakeDeposit />} />
          <Route path='/deposit/success' element={<Success />} />
          <Route path='/savings/start' element={<MakeSavings />} />
          <Route path='/savings/success' element={<Success />} />
        </Routes>
      </Border>
    </Router>
  );
}

export default App;
