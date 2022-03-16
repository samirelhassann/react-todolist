import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import styles from "./App.module.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { ITask } from "./interfaces/Task";
import Modal from "./components/Modal";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [tasktoUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const updateTask = (task: ITask): void => {
    setTaskList(
      taskList.map((t) => {
        if (t.id === task.id) {
          t.title = task.title;
          t.difficulty = task.difficulty;
        }

        return t;
      })
    );

    hideOrShowModal(false);
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");

    if (display) modal!.classList.remove("hide");
    else modal!.classList.add("hide");
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  return (
    <div>
      <Modal
        children={
          <TaskForm
            btnText="Editar tarefa"
            taskList={taskList}
            task={tasktoUpdate}
            updateTaskList={updateTask}
          />
        }
      />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que voce vai fazer ?</h2>
          <TaskForm
            btnText="Enviar"
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Suas tarefas</h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
