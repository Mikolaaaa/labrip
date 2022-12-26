import React, {useState} from 'react';
import "../App.css";
import Cookies from 'universal-cookie';
import {Button} from "react-bootstrap";


export function Auth() {


    const [log, setLog] = useState('');
    const [pass, setPass] = useState('');

    function Login() {
        const ob = {
            username: log,
            password: pass,
        }
        fetch("http://127.0.0.1:8000/rest-auth/login/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            body: JSON.stringify(ob),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const token = res.key;
                sessionStorage.setItem('token', token);
                const cookies = new Cookies();
                cookies.set('session_cookie', token, { path: '/' });
                fetch(`http://127.0.0.1:8000/rest-auth/user/`, {
                        headers: {
                            "Authorization": `Token ${sessionStorage.getItem('token')}`,
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            localStorage.setItem('user_id', data.pk)
                            localStorage.setItem('user_login', data.username)
                            sessionStorage.setItem('username', data.username)
                            console.log(data)
                        })
                if (sessionStorage.getItem('token') === 'undefined') {
                    alert("Введите правильные данные")
                    window.location.replace("/")
                }
                else {
                    alert("Добрый день комиссар")
                    window.location.replace("/priziv")
                }
            })
        }


        function Priz() {
        const ob = {
            username: log,
            password: pass,
        }
        fetch("http://127.0.0.1:8000/rest-auth/login/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            body: JSON.stringify(ob),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const token = res.key;
                sessionStorage.setItem('token', token);
                const cookies = new Cookies();
                cookies.set('session_cookie', token, { path: '/' });
                fetch(`http://127.0.0.1:8000/rest-auth/user/`, {
                        headers: {
                            "Authorization": `Token ${sessionStorage.getItem('token')}`,
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            localStorage.setItem('user_id', data.pk)
                            localStorage.setItem('user_login', data.username)
                            sessionStorage.setItem('username', data.username)
                        })
                if (sessionStorage.getItem('token') === 'undefined') {
                    alert("Добрый день призывник")
                    window.location.replace("/komissar")
                }
                else {
                    window.location.replace("/")
                }
            })
        }


    return (
        <div className="register-block">
            <h1 className="title-block">
                    Войти
            </h1>
            <form className="form-block">
                    <div className="mb-2">
                        <label
                            htmlFor="login"
                            className="text-block33"
                        >
                            Логин
                        </label>
                        <input
                            type="login"
                            onChange={(event) => setLog(event.target.value)}
                            value={log}
                            className="input-block33"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="text-block33"
                        >
                            Пароль
                        </label>
                        <input
                            type="password"
                            onChange={(event) => setPass(event.target.value)}
                            value={pass}
                            className="input-block33"
                        />
                    </div>
                </form>
                <div className="mt-6">
                    <Button
                        className="arm_button btn-light"
                        onClick={() => Login()}
                    >
                        Войти
                    </Button>
                </div>

            <p className="repage-block">
                    <Button
                        className="arm6_button btn-light"
                        onClick={() => Priz()}
                    >
                        Зайти как призывник
                    </Button>
                    <Button
                        href="/reg"
                        className="arm6_button btn-light"
                    >
                        Регистрация
                    </Button>
                </p>
        </div>
    );
}