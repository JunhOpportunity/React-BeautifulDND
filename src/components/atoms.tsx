import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO",
  "DOING",
  "DONE"
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: []
});

// toDoSelector은 "배열" 을 리턴한다
export const toDoSelector = selector({
  key: "toDoSelector",
  // 이건 필터링을 위해서 쓰인 것. 무슨 필터링이냐, 카테고리별로 나누는 필터링
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
    // toDos.filter((toDo) => toDo.category === "TO_DO"),
    // toDos.filter((toDo) => toDo.category === "DOING"),
    // toDos.filter((toDo) => toDo.category === "DONE")
  }
});
// selector가 atom을 보고있음. -> atom 바뀌면 selector도 바뀜
//

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({get}) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({set}, newValue) => {
    const minutes = Number(newValue) * 60
    set(minuteState, minutes);
  }
})