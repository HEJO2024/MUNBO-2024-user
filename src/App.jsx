import "./App.css";
import "../src/styles/fonts/font.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Create from "./pages/Note/Create";
import Detail from "./pages/Note/Detail";
import GoTest from "./pages/Quiz/GoTest";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage/MyPage";
import Note from "./pages/Note/Note";
import NoteUpdate from "./pages/Note/NoteUpdate";
import Quiz from "./pages/Quiz/Quiz";
import Select from "./pages/Quiz/Select";
import Summary from "./pages/Note/Summary";
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

          <Route path="/note" element={<Note />} />
          <Route path="/note/detail" element={<Detail />} />
          <Route path="/note/create" element={<Create />} />
          <Route path="/note/update" element={<NoteUpdate />} />
          <Route path="/note/summary" element={<Summary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
