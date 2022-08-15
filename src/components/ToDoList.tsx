import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDo from "./createToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // const [toDos, setToDos] = useRecoilState(toDoState);
  // useRecoilValue는 atom이나 selector의 값만 반환
  const toDos = useRecoilValue(toDoSelector);
  // useRecoilState는 atom이나 selector의 값과 modifier 함수도 제공
  const [category, setCategory] = useRecoilState(categoryState);
  // input이 변할 때 마다 setCategory 호출
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {/* {category === "TO_DO" &&  todo.map(aToDo=>)} */}
      {/* {category === "DOING" &&  doing.map(aToDo=>)} */}
      {/* {category === "DONE"  && done.map(aToDo=>)} */}
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
