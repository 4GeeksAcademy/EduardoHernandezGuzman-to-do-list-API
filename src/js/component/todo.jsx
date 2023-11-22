import React, { useState, useEffect } from "react";

const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);


//Creamos el usuario (satan) (usamos POST)
    function creacionUsuario() {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/satan', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([])
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

//Traemos las tareas desde la API (GET)
    function obtencionDeTareas() {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/satan')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTodos(data);
            })
    }

//Actualizamos las tareas (PUT)
    function actualizacion(todos) {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/satan', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todos)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

//Borramos todas las tareas (DELETE)    
    function borrarTodasLasTareas() {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/satan', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTodos([]);
            })
    }

//Queremos que la creacion de usuario y la obtención de tareas se hagan cuando haya un cambio 
    useEffect(() => {
        creacionUsuario();
        obtencionDeTareas();
    }, []);

//Esta función maneja el evento de cambio de entrada para el campo de entrada    
    function handleInput(event) {
        setInputValue(event.target.value);
    }

//Esta función maneja el evento de pulsación de tecla Enter
    function agregar(event) {
        if (event.key === "Enter" && inputValue !== "") {
            const nuevaTarea = {
                label: inputValue,
                done: false
            };
            setTodos([...todos, nuevaTarea]);
            actualizacion([...todos, nuevaTarea]);
            setInputValue("");
        }
    }

//Esta función se utiliza para suprimir una tarea del array de estado "todos"
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
                    <button onClick={borrarTodasLasTareas}>Borrar todo</button>
                </ul>
                
                <div className="tareas">Tienes <b>{todos.length}</b> tareas</div>

            </div>
           
        </>
    );
};

export default Todo;
