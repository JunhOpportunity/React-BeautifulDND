import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 10px 5px #4b5d67;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#576F72"
      : props.isDraggingFromThis
      ? "#7D9D9C"
      : "#7D9D9C"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

interface IBoardPRops {
  toDos: ITodo[];
  boardId: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardPRops) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo]
        // 새로운게 맨 앞에 생성되게 하고 싶다면 newToDo를 맨 앞에 두고
        // 새로운게 맨 뒤에 생성되게 하고 싶다면 newToDo를 맨 뒤에 두어라
      };
    });
    setValue("toDo", ""); // submit 할 때 마다 clear
  };

  // const {} = useForm();
  // const inputRef = useRef<HTMLInputElement>(null); // 이건 document.querySelector()과 같다.
  // const onClick = () => {
  //   inputRef.current?.focus(); // 이 코드를 통해 input으로 가는 것.
  //   inputRef.current?.blur();
  // };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      {/* <input ref={inputRef} placeholder="grab me" />
      <button onClick={onClick}>click</button> */}
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver} // 드래그해서 들어오는지 알려줌
            isDraggingFromThis={Boolean(info.draggingFromThisWith)} // 해당 board로부터 드래그를 시작했는지 알려줌
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}

            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
