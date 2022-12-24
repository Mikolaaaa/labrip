import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import FullPriziv from "./fullpriziv";


function Mega() {

    const [mega, setMega] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/mega/`, {
            method: 'GET',
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            }
        })
            .then(response => response.json())
            .then((result) => {
                setMega(result);
            })
    }, []);

    return (
        <div className={"mega"}>
            {mega.map(item => (
                <div key={item.username}>
                    <br/>
                        <div className={"mega"}><a>Логин: {item.username}</a></div>
                        <div className={"mega"}><a>Пароль: {item.password}</a></div>
                        <div className={"mega"}><a>Почта: {item.email}</a></div>
                        <div className={"mega"}><a>Последний вход: {item.last_login}</a></div>
                        <div className={"mega"}><a>Дата создания: {item.date_joined}</a></div>
                        <div className={"mega"}><a>Суперюзер?(1-да, 0-нет): {item.is_superuser}</a></div>
                    <br/>
                </div>
                ))}
        </div>
    )
}

export default Mega;