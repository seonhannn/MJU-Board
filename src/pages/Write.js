import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCallback, useState} from "react";
import api from "../utils/api";
import {jwtUtils} from "../utils/jwtUtils";
import {toast} from "react-toastify";
import TextArea from "../components/TextArea";
import "react-toastify/dist/ReactToastify.css";

function Write() {
  const token = useSelector(state => state.Auth.token);
  const navigate = useNavigate();

  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
 
  const canSubmit = useCallback(() => {
    return content !== "" && title !== "";
  }, [title, content]);

  const handleSubmit = useCallback(async () => {
    try{
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("user_id", jwtUtils.getId(token));

      await api.post("http://52.78.83.72:8080/api/boards/${clubId}/create", formData);
      window.alert("등록이 완료되었습니다.");
      navigate("/boardList");
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error("오류가 발생했습니다.");
    }
  }, [canSubmit]);

  return (
    <div className="addBoard-wrapper">
      <div className="addBoard-header">
        게시물 등록
      </div>
      <div className="submitButton">
        {canSubmit() ? (
          <button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            등록하기
          </button>
        ) : (
          <button
            className="disable-button"
            variant="outlined"
            size="large"
          >
            내용을 입력하세요.
          </button>
        )}
      </div>
      <div className="addBoard-body">
        <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content}/>
      </div>
    </div>
  );
}

export default Write;