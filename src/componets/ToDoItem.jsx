import React, { useState } from "react";
import check from '../assets/check.png';
import uncheck from '../assets/uncheck.png';
import edit from '../assets/edit.png';
import delete_icon from '../assets/delete_icon.png';

function ToDoItem({ task, deleteTask, toggleComplete, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task.text);

    const handleEdit = () => {
        if (editedTask.trim()) {
            editTask(task.id, editedTask);
            setIsEditing(false);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 my-3 rounded-xl shadow-md bg-gradient-to-l from-orange-400 to-blue-500">
            <div
                className={`flex items-center flex-1 gap-4 ${
                    isEditing ? "" : "cursor-pointer"
                }`}
                onClick={!isEditing ? () => toggleComplete(task.id) : undefined}
            >
                <img className="w-6 h-6" src={task.isComplete ? check : uncheck} alt="check" />

                {isEditing ? (
                    <input
                        className="px-3 py-1 w-full text-[16px] bg-white text-gray-900 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <p
                        className={`text-[17px] ${
                            task.isComplete ? "line-through text-gray-300" : "text-white"
                        }`}
                    >
                        {task.text}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-3 ml-4">
                {isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                    >
                        Save
                    </button>
                ) : (
                    <img
                        onClick={() => setIsEditing(true)}
                        className="w-5 h-5 cursor-pointer hover:brightness-125 transition"
                        src={edit}
                        alt="edit"
                    />
                )}
                <img
                    onClick={() => deleteTask(task.id)}
                    className="w-5 h-5 cursor-pointer hover:brightness-150 transition"
                    src={delete_icon}
                    alt="delete"
                />
            </div>
        </div>
    );
}

export default ToDoItem;
