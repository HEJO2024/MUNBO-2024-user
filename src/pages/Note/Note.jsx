import "../../styles/pages/Note/Note.css";

import { useEffect, useState } from "react";

import CreateIcon from "../../assets/icon/icon_create-note.svg";
import Empty from "../../components/Empty";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Note() {
  const navigate = useNavigate();
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    fetchNoteList();
  }, []);

  const fetchNoteList = () => {
    const token = sessionStorage.getItem("token");
    axios
      .get("/api/summaryNote/note/listView", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setNoteList(response.data.summaryList);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  return (
    <div className="note">
      <Header />
      <div className="note__container">
        <div className="note__wrapper">
          <div className="note__header">
            <span>요약노트</span>
            <img
              src={CreateIcon}
              alt="등록"
              onClick={() => navigate("/note/create")}
              style={{ cursor: "pointer" }}
            />
          </div>
          {noteList.length === 0 ? (
            <Empty message="저장된 요약노트가 없어요." />
          ) : (
            <table className="note__table">
              <thead>
                <tr>
                  <th>제목</th>
                  <th>작성일</th>
                  {/* <th>문제</th> */}
                </tr>
              </thead>
              <tbody>
                {noteList.map((item, index) => (
                  <tr key={item.noteId}>
                    <td onClick={() => navigate(`/note/detail/${item.noteId}`)}>
                      {item.summaryTitle}
                    </td>
                    <td>{item.summaryDate}</td>
                    {/* <td>{item.quiz}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* <div className="note__footer">
            <span style={{ cursor: "pointer" }}>
              &lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span>1 / 1</span>
            <span style={{ cursor: "pointer" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
            </span>
          </div> */}
        </div>
      </div>
      <MenuBar icon="note" />
    </div>
  );
}
