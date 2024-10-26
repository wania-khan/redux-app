import React, { useState } from "react";
import Notes from '../assets/images/notes.png';
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, toggleTaskCompletion, editTask } from "../listReducer";

const HeroSection = () => {
    const list = useSelector((state) => state.list);
    const dispatch = useDispatch();

    const [newTask, setNewTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null); 
    const [editValue, setEditValue] = useState(""); 

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            dispatch(addTask(newTask.trim()));
            setNewTask("");
        }
    };

    const startEditing = (index, currentTitle) => {
        setEditingIndex(index);
        setEditValue(currentTitle);
    };

    const handleEditTask = () => {
        if (editValue.trim() !== "") {
            dispatch(editTask({ index: editingIndex, newTitle: editValue.trim() }));
            setEditingIndex(null); 
            setEditValue(""); 
        }
    };

    return (
        <>
            <div className="flex gap-4 align-middle justify-center items-center mt-12">
                <img src={Notes} alt="error_notes" className="w-20 h-20" />
                <h1 className="font-semibold text-3xl text-[#2e718e]">To-Do List</h1>
            </div>
            <div className="p-12">
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded"
                        placeholder="Add new task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button
                        onClick={handleAddTask}
                        className="rounded-full bg-[#0a2646] border border-black text-white px-5 py-2 text-sm"
                    >
                        Add to To-Do List
                    </button>
                </div>
                {list.length === 0 ? (
                    <p className="text-center text-gray-500">No tasks available. Add a new task!</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                            <thead className="bg-[#f0f8ff] text-[#2e718e]">
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">To-Do</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Completed</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Remove</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold">Edit</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-gray-700">
                                {list.map((li, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4">
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="border border-gray-300 p-2 rounded w-full"
                                                />
                                            ) : (
                                                <span className={li.completed ? "text-gray-300" : ""}>
                                                    {li.title}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 ml-5">
                                            <button
                                                className={`w-6 h-6 rounded-full border-2 ${
                                                    li.completed ? "bg-green-500" : "border-gray-300"
                                                }`}
                                                onClick={() => dispatch(toggleTaskCompletion(index))}
                                            >
                                                {li.completed && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="w-4 h-4 ml-[2px] text-white"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => dispatch(deleteTask(index))}
                                                className="text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingIndex === index ? (
                                                <button
                                                    onClick={handleEditTask}
                                                    className="text-green-500"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => startEditing(index, li.title)}
                                                    className="text-blue-500"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default HeroSection;