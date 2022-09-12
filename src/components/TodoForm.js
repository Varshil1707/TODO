import React, { useEffect, useState } from "react";
import "./TodoForm.css";
import "./ListTodo.css";
import axios from "axios";
import { getDefaultNormalizer } from "@testing-library/react";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  let arrayList = [];

  const getTask = async() => {

    const fetcheData = await axios
      .get("https://todo-ac50c-default-rtdb.firebaseio.com/tasks.json")
      .then((res) => {
        for (const key in res.data) {
          const temp = { id: key, fireData: res.data };
          arrayList.push({ data: res.data[key], id: key });
          setData(arrayList);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTask()
  }, []);

  const addTask = async(e) => {
    e.preventDefault();
    console.log();
    setTask("");
    const addData = await axios
      .post("https://todo-ac50c-default-rtdb.firebaseio.com/tasks.json", {
        task,
        status: isCompleted,
      })
      .then((res) => console.log("Data Added successfully"))
      .catch((err) => console.log(err));
      getTask()
      console.log("first")
  };

  const deleteData = async(e) => {
    const id = e.target.id;
    console.log(id);
    // getTask()
    // const newData = data.filter((data) => {
    //   return data.id !== id;
    // });

    const response = await axios.delete(
      `https://todo-ac50c-default-rtdb.firebaseio.com/tasks/${id}.json`
    );
    getTask()
  };
  // getTask()

  console.log(data);

  return (
    <div>
      <p className="heading-text">React Todo-List</p>

      <div className="task-container">
        <div>
          <input
            className="text-input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>
        <div className="list-container">
          {data.map((data) => (
            <div key={data.id} className="task-list">
              {data.data.task}

              <button
                className="delete-button"
                onClick={deleteData}
                id={data.id}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
