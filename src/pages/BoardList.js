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
            const {data} = await axios.get(`/api/boards/1/list`);
            return data;
        }

        getBoardList().then(result => setBoardList(result));

        const getTotalBoard = async () => {

            // 전체 게시글 개수
            // const {data} = await axios.get(`/api/boards/1/count`);
            // return data.total;
        }

        getTotalBoard().then(result => setPageCount(Math.ceil(result/4)));
    }, [])

    return (
        <div>
            동아리 게시판
            <div>
                {boardList.data && boardList.data.map((item, index) => {
                    return (<div key={item.id}>
                        {item.title}
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BoardList;