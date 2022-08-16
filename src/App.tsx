import "./styles.css";
import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "react-beautiful-dnd";

import styled from "styled-components";
import { toDoState } from "./components/atoms";
import { useRecoilState } from "recoil";
import DragabbleCard from "./Components/DragabbleCard";
import Board from "./Components/Board";
const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
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
    return;
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
