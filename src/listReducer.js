import { createSlice } from "@reduxjs/toolkit";
import { staticData } from "./components/staticData";

const loadFromLocalStorage = () => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : staticData;
};

const saveToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const listSlice = createSlice({
    name: "list",
    initialState: loadFromLocalStorage(),
    reducers: {
        addTask: (state, action) => {
            state.push({ title: action.payload, completed: false });
            saveToLocalStorage(state);
        },
        deleteTask: (state, action) => {
            const updatedTasks = state.filter((_, index) => index !== action.payload);
            saveToLocalStorage(updatedTasks);
        },
        toggleTaskCompletion: (state, action) => {
            const task = state[action.payload];
            task.completed = !task.completed;
            saveToLocalStorage(state);
        },
        editTask: (state, action) => {
            const { index, newTitle } = action.payload;
            state[index].title = newTitle;
            saveToLocalStorage(state);
        },
    },
});

export const { addTask, deleteTask, toggleTaskCompletion, editTask } = listSlice.actions;
export default listSlice.reducer;