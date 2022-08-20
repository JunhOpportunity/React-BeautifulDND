import { atom, selector } from "recoil";

interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  // 나중에 유저가 Board를 추가할 수 있기때문에
  // 이렇게 toDoState를 배열 형태로 지정한다.
  // 따로 현재 사용중인 key들만 입력하는 것이 아니라.
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: []
  }
});
