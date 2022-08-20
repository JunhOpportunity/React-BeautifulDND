import "./styles.css";
import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "react-beautiful-dnd";

import styled from "styled-components";
import { toDoState } from "./atoms";
import { useRecoilState } from "recoil";
import DragabbleCard from "./Components/DragabbleCard";
import Board from "./Components/Board";
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

// Card 들면 opacity 1 (drag)
// Card 놓으면 opacity 0 (drop)
//

const TrashCan = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 10vh;
  height: 10vh;
  background-color: red;
  transitoin: all 1s;
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    // 얘 사용하면 이제 DND해도 원상복구 X
    // source는 방금 건든 애의 index (= 어디서 왔는지)
    // destination은 단어 뜻 그대로 목적지
    // setToDos((oldToDos) => {
    //   const toDosCopy = [...oldToDos];
    //   console.log("Delete item on", source.index);
    //   console.log(toDosCopy);
    //   toDosCopy.splice(source.index, 1);
    //   console.log("Deleted item");
    //   console.log(toDosCopy);
    //   // 2) Put back the item on the destination.index
    //   console.log("Put back", draggableId, "on ", destination.index);
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   console.log(toDosCopy);

    // same board movement check
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;

    // Board 내에서의 이동
    if (destination?.droppableId === source.droppableId) {
      // same board movement check
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index]; // object 삭제하기 전에 저장하기
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          // ...allBoards는 바꾸기 전의 모든 리스트를 반환
          // source.droppableId는 바꿀 것의 ID를 반환 (To Do, Doing, Done 중 하나)
          // boardCopy는 사용자가 바꾼 내용을 source.droppableId key에 적용시키기 위한 것
          // 따라서 [source.droppableId]: boardCopy
          // => [To Do]: ["a", "b"] 이렇게 해서 유저가 변경한 것만 적용시키는 것인듯?
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      });
    }

    // Board와 Board간의 이동
    if (destination.droppableId !== source.droppableId) {
      // another Destination (category) movement
      setToDos((allBoards) => {
        // start Board (옮긴 뒤에 출발 Board에 남아있는 것 추출)
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        console.log(sourceBoard);
        // finish Board (옮긴 뒤에 도착 Board에 남아있는 것을 추출)
        const destinationBoard = [...allBoards[destination.droppableId]];
        console.log(destinationBoard);
        // Delete & Add (출발 Board에서 하나 지우고, 도착 Board에서 하나 추가)
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);

        // ???
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard
        };
      });
    }
  };
  return (
    // onDrageEng 함수는 유저가 드래그를 끝낸 시점에 불려지는 함수
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <TrashCan></TrashCan>
      </Wrapper>
    </DragDropContext>
  );
}
