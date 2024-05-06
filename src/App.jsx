import "./App.css";
import "../src/styles/fonts/font.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AI from "./pages/Quiz/AI";
import Create from "./pages/Note/Create";
import Detail from "./pages/Note/Detail";
import Essay from "./pages/Note/Quiz/Type/Essay";
import GoTest from "./pages/Quiz/GoTest";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Login from "./pages/Login";
import MCQ from "./pages/Note/Quiz/Type/MCQ";
import MyPage from "./pages/MyPage/MyPage";
import Note from "./pages/Note/Note";
import NoteUpdate from "./pages/Note/NoteUpdate";
import Quiz from "./pages/Quiz/Quiz";
import Score from "./pages/Quiz/Score";
import Select from "./pages/Quiz/Select";
import Settings from "./pages/Note/Quiz/Settings";
import Summary from "./pages/Note/Summary";
import TF from "./pages/Note/Quiz/Type/TF";
import Test from "./pages/Quiz/Test";
import Update from "./pages/MyPage/Update";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/update" element={<Update />} />

          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/select" element={<Select />} />
          <Route path="/quiz/go-test" element={<GoTest />} />
          <Route path="/quiz/test" element={<Test />} />
          <Route path="/quiz/ai" element={<AI />} />
          <Route path="/quiz/score" element={<Score />} />

          <Route path="/note" element={<Note />} />
          <Route path="/note/detail/:noteId" element={<Detail />} />
          <Route path="/note/create" element={<Create />} />
          <Route path="/note/update" element={<NoteUpdate />} />
          <Route path="/note/summary" element={<Summary />} />
          <Route path="/note/quiz/settings" element={<Settings />} />
          <Route path="/note/quiz/MCQ" element={<MCQ />} />
          <Route path="/note/quiz/Essay" element={<Essay />} />
          <Route path="/note/quiz/TF" element={<TF />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
