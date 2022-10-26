import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import api from "../utils/api";
import TextArea from "../components/TextArea";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function EditBoard() {
  const token = useSelector(state => state.Auth.token);
  const navigate = useNavigate();
  // URI 파라미터 가져오기
  const {board_id} = useParams();
  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 사용자가 직전에 등록한 게시물의 상태를 그대로 보여주기 위해
  // 컴포넌트가 마운트되고 URI 파라미터에 해당하는 board를 가져와서
  // title, content, image의 상태를 바꿔줌
  useEffect(() => {
    const getBoard = async () => {
      const {data} = await axios.get(`/api/boards/1`);
      return data;
    }
    getBoard().then((result) => {
      setTitle(result.title);
      setContent(result.content);
    });
  }, [])

  const canSubmit = useCallback(() => {
    return content !== "" && title !== "";
  }, [title, content]);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      // 수정할 땐 board_id를 보내자
      formData.append("id", board_id);
      await api.put(`http://52.78.83.72:8080/api/boards/update/${id}`, formData);
      window.alert("수정이 완료되었습니다.");
      // 이전 페이지로 돌아가기
      window.location.href = `/board/${board_id}`;
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error("오류가 발생했습니다.");
    }
  }, [canSubmit]);

  return (
    <div className="addBoard-wrapper">
      <div className="addBoard-header">
        게시물 수정
      </div>
      <div className="submitButton">
        {canSubmit() ? (
          <button
            onClick={handleSubmit}
            className="success-button"
          >
            수정하기
          </button>
        ) : (
          <button
            className="disable-button"
          >
            제목과 내용을 모두 입력하세요.
          </button>
        )}
      </div>
      <div className="addBoard-body">
        <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content}/>
      </div>
    </div>
  );
}

export default EditBoard;