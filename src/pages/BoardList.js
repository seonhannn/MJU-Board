import React, {useEffect, useState} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function BoardList() {

    const [pageCount, setPageCount] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(() => {
        const getBoardList = async () => {
            const pageNumber = searchParams.get("page");
            const {data} = await axios.get(`/api/board/list?page_number=${pageNumber}&page_size=4`);
            return data;
        }

        getBoardList().then(result => setBoardList(result));

        const getTotalBoard = async () => {
            const {data} = await axios.get("/api/board/count");
            return data.total;
        } 

        getTotalBoard().then(result => setPageCount(Math.ceil(result/4)));
    }, [])

    return (
        <div>
            동아리 게시판
            <div>
                {boardList.map((item, index) => {
                    <div key={item.id}>
                        {item.id}
                    </div>
                })}
            </div>
        </div>
    )
}

export default BoardList;