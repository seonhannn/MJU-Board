import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../css/BoardList.css";
import clubData from "../components/ClubData";

function BoardList() {

    const [pageCount, setPageCount] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const getBoardList = async () => {
            const {data} = await axios.get(`http://52.78.83.72:8080/api/boards/${id}/list`);
            return data;
        }


        getBoardList().then(result => setBoardList(result));

        // const getTotalBoard = async () => {

        //     const {data} = await axios.get(`http://52.78.83.72:8080/api/boards/${id}/count`);
        //     return data.total;
        // }

        // getTotalBoard().then(result => setPageCount(Math.ceil(result/4)));
    }, [])

    return (
        <div className="board-list">
            <div className="board-list-title">
                {clubData[id-1].title}
            </div>
            <div className="board-list-info-title">
                <div className="board-list-board-info-idx">번호</div>
                <div className="board-list-board-info-title">제목</div>
                <div className="board-list-board-info-writer">작성자</div>
            </div>
            <div className="board-list-container">
                {boardList.data && boardList.data.map((item, index) => {
                    return (
                        <Link to={`/boards/${item.id}`} className="board-list-link">
                            <div key={item.id} className="board-list-info">
                                <div className="board-idx">
                                    {item.id}
                                </div>
                                <div className="board-title">
                                    {item.title}
                                </div>
                                <div className="board-writer">
                                    {item.writer}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default BoardList;