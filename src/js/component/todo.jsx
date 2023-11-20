import React, { useState, useEffect } from "react";

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);




    async function creacionUsuario() {
        try {
            let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/satan', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([]),
            });
            let data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function obtencionDeTareas() {
        try {
            let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/satan');
            let data = await response.json();
            console.log(data);
            setTodos(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function actualizacion(todos) {
        try {
            await fetch('https://playground.4geeks.com/apis/fake/todos/user/satan', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todos),
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function borrarTodasLasTareas() {
        try {
            await fetch('https://playground.4geeks.com/apis/fake/todos/user/satan', {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            });
            setTodos([]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        creacionUsuario();
        obtencionDeTareas();
    }, []);

    function handleInput(event) {
        setInputValue(event.target.value);
    }

    function agregar(event) {
        if (event.key === "Enter" && inputValue !== "") {
            const newTask = {
                label: inputValue,
                done: false
            };
            setTodos([...todos, newTask]);
            actualizacion([...todos, newTask]);
            setInputValue("");
        }
    }

    function suprimir(index) {
        const newList = todos.filter((item, i) => index !== i);
        actualizacion(newList);
        setTodos(newList);
    }







    return (
        <>
            <div className="container col-4 todofondo">
                <h1 className="display-4">Mi lista de tareas</h1>
                <ul>
                    <li>
                        <input
                            className="cajas"
                            value={inputValue}
                            onChange={handleInput}
                            onKeyDown={agregar}
                            type="text"
                            placeholder="¿Qué quieres hacer?"
                        />
                    </li>
                    {todos.map((item, index) => (
                        <li key={index}>
                            {item.label}{" "}
                            <svg
                                onClick={() => suprimir(index)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>{" "}
                        </li>
                    ))}
                </ul>
                <div className="tareas">{todos.length} tareas</div>
                
            </div>
            <div className="container col-4">
            <button onClick={borrarTodasLasTareas}>Borra todo</button>
            </div>
        </>
    );
};

export default Todo;
