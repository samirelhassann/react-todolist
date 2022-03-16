import React from "react";
import { ITask } from "../interfaces/Task";
import styles from "./TaskList.module.css";

interface Props {
  taskList: ITask[];
  handleDelete(id: number): void;
  handleEdit(task: ITask): void;
}

const TaskList = ({ taskList, handleDelete, handleEdit }: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>Titulo: {task.title}</h4>
              <p>Dificuldade: {task.difficulty}</p>
            </div>
            <div className={styles.action}>
              <i
                className="bi bi-pencil"
                onClick={() => {
                  handleEdit(task);
                }}
              />
              <i
                className="bi bi-trash"
                onClick={() => {
                  handleDelete(task.id);
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p>Não existem tarefas</p>
      )}
    </>
  );
};

export default TaskList;
