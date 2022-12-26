import React, {useState} from "react";
import "../App.css"
import {Button} from "react-bootstrap";

function Reg() {
    const [log, setLog] = useState('');
    const [pass, setPass] = useState('');
    const [mail, setMail] = useState('');

    function Create() {
        const ob = {
            username: log,
            email:mail,
            password1: pass,
            password2: pass,
        }
        fetch("http://127.0.0.1:8000/rest-auth/registration/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const token = res.data.key;
                localStorage.setItem('token', token);
                alert(token);
            })
    }


    return (
            <div className="register-block">
                <h1 className="title-block">
                    Регистрация
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
                            type="name"
                            onChange={(event) => setPass(event.target.value)}
                            value={pass}
                            className="input-block33"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="text-block33"
                        >
                            Почта
                        </label>
                        <input
                            type="name"
                            onChange={(event) => setMail(event.target.value)}
                            value={mail}
                            className="input-block33"
                        />
                    </div>
                    <div className="mt-6">
                        <Button to="/"
                              className="arm6_button btn-light"
                              onClick={() => Create()}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>
                <br/>
                <p className="repage-block">
                    {" "}
                    Уже есть аккаунт?{" "}
                    <Button
                        href="/"
                        className="font-medium text-indigo-600 text-xl hover:underline btn-light arm6_button"
                    >
                        Войти
                    </Button>
                </p>
            </div>
    )
}
export default Reg;