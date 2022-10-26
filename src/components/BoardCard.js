import { useNavigate } from "react-router-dom";

function BoardCard({board_id, title, content, username, date}) {

    const navigate = useNavigate();

    return (
        <div 
            className="board-card"
            onClick={() => {
                navigate(`/BoardList/${board_id}`)
            }}>
            <div className="board-card-container">
                <div className="board-card-title">글제목{title}</div>
                <div className="board-card-content">글내용{content}</div>
            </div>
            <div className="board-card-info">
                <div className="board-card-username">{username}</div>
                <div className="board-card-date">{date}</div>
            </div>
        </div>
    )
}

export default BoardCard;