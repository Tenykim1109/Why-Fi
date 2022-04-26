import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './pages/account/Signup';
import Login from './pages/account/Login';
import Start from './pages/quiz/Start';
import Quiz from './pages/quiz/Quiz';
import Result from './pages/quiz/Result';

import Border from './components/Border';

function App() {
  return (
    <Router>
      <Border>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route path='/quiz/start' element={<Start />} />
          <Route path='/quiz/' element={<Quiz />} />
          <Route path='/quiz/result' element={<Result />} />
        </Routes>
      </Border>
    </Router>
  );
}

export default App;
