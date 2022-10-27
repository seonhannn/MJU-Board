import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams, useNavigate, useNavigate } from "react-router-dom";
import { jwtUtils } from "../utils/jwtUtils";
import { useSelector } from "react-redux";
import api from "../utils/api";
import { ResultType } from "@remix-run/router/dist/utils";

function Board() {

  const {id} = useParams();
  const {board, setBoard} = useState({});
  const {isLoaded, setIsLoaded} = useState(false);
  const token = useSelector(state => state.Auth.token);
  const useNavigate = useNavigate();
  const {show, setShow} = useState(false);

  useEffect(() => {
    const getBoard = async () => {
      const {data} = await axios.get(`http://52.78.83.72:8080/api/boards/${board_id}`);
      return data;
    }
    getBoard().then(result => setBoard(result).then(() => setIsLoaded(true)));
  }, [])

  return (
    <div>
      게시글
      {isLoaded && (
        <div>
          {
            // 해당 글의 작성자가 로그인을 했을 때만 수정, 삭제 버튼이 보이도록 한다.
            // 로그인을 한 사용자의 jwt-token에서 user의 id를 추출한 후,
            // 해당 글의 user의 id를 비교하였을 때 같으면 보이도록 한다.
            jwtUtils.isAuth(token) && jwtUtils.getId(token) === board.user.id &&
              <div>
                <button onClick={() => {
                  setShow(true)
                }}>
                  삭제
                </button>
                <button onClick={() => {
                  navigate(`/Edit/$board_id`)
                }}>
                  수정
                </button>
              </div>
          }
          <div>
            <div>{board.user.username}</div>
            <div>
              <div>{board.title}</div>
              <div>{board.content}</div>
            </div>
          </div>
        </div>
      )}
      {/* modal */}
      
    </div>
  )

}