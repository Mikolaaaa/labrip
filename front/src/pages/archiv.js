import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";


function Archiv() {

    const [archive, setArchive] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/otsluzhivshie/`)
            .then(response => response.json())
            .then((result) => {
                setArchive(result);
            })
    }, []);

    return (
        <div>
            <Link to="/komissar">Отслужившие</Link><br/>
            <div className={"assortment"}><h1>Отслужившие</h1></div>
            <div className={"priziv_list"}>
                {archive.map(item => (
                    <div className={"priziv"} key={"surname:" + item.surname}>
                        <div className={"surname"}><a>Фамилия: {item.surname}</a> </div>
                            <div className={"surname"}><a>Имя: {item.name}</a></div>
                            <div className={"surname"}><a>Отчество: {item.patronymic}</a></div>
                            <div className={"surname"}><a>Адрес: {item.adress}</a></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Archiv;