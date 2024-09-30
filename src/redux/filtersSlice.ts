import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Тип состояния для фильтра
interface FilterState {
  name: string;
}

// Начальное состояние
const initialState: FilterState = {
  name: "",
};

// Создание слайса для фильтра
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Action для изменения значения фильтра
    changeFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

// Экспорт экшенов
export const { changeFilter } = filtersSlice.actions;

// Селектор для получения значения фильтра из состояния
export const selectNameFilter = (state: RootState) => state.filters.name;

// Экспорт редюсера
export default filtersSlice.reducer;
