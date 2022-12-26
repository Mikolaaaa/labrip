import {Link, useParams} from "react-router-dom";
import "../App.css";
import {Button, Form, Modal} from "react-bootstrap";
import React, {useState, useEffect, useReducer} from 'react';
import axios from "axios";
import {GetPrizivnik} from "../context/provider";


function FullPriziv() {

    let ID = window.location.pathname.split('/');
    const fullpriziv = GetPrizivnik(ID[2])


    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [patronymic, setPatronymic] = useState();
    const [vozrast, setVozrast] = useState();
    const [otsrochka, setOtsrochka] = useState();
    const [adress, setAdress] = useState();
    const [categoriya, setCategoriya] = useState();

    const handleClose = async ()=> {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('patronymic', patronymic)
        formData.append('vozrast', vozrast)
        formData.append('otsrochka', otsrochka)
        formData.append('adress', adress)
        formData.append('categoriya', categoriya)
        setShow(false);
        const ob = {
            name: name,
            surname: surname,
            vozrast: vozrast,
            categoriya: categoriya,
            adress: adress,
            otsrochka: otsrochka,
            patronymic: patronymic
        }
        let ID = window.location.pathname.split('/');
        await fetch(`http://127.0.0.1:8000/prizivnikch/${ID[2]}/` , {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
            body: JSON.stringify(ob)
        })
        window.location.reload()
    }

    const otsrochkaCh = (fullpriziv1) => {
        let otsrochka_change = {
            "otsrochka": "есть",
        }
        fetch("http://127.0.0.1:8000/otsrochkach/" + fullpriziv1.pk + "/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
            body: JSON.stringify(otsrochka_change)
        })
            .then(res => {
                if (res.ok) {
                    console.log("HTTP request successful");
                    window.location.reload();
                } else {
                    console.log("HTTP request unsuccessful");
                }
            })
    }

    const otsrochkaCh1 = (fullpriziv1) => {
        let otsrochka_change
        if (fullpriziv1.otsrochka==="есть") {
            otsrochka_change = {
                "otsrochka": "нет",
            }
        } else {
            otsrochka_change = {
                "otsrochka": "есть",
            }
        }
        fetch("http://127.0.0.1:8000/otsrochkach/" + fullpriziv1.pk + "/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
            body: JSON.stringify(otsrochka_change)
        })
            .then(res => {
                if (res.ok) {
                    console.log("HTTP request successful");
                    window.location.reload();
                } else {
                    console.log("HTTP request unsuccessful");
                }
            })
    }

    const handleShow = ()=> setShow(true);

    const Input31 = async (event) => {
        setName(event.target.value);
    }
    const Input32 = async (event) => {
        setSurname(event.target.value)
    }
    const Input33 = async (event) => {
        setPatronymic(event.target.value)
    }
    const Input34 = async (event) => {
        setVozrast(event.target.value)
    }
    const Input35 = async (event) => {
        setOtsrochka(event.target.value)
    }
    const Input36 = async (event) => {
        setCategoriya(event.target.value)
    }
    const Input37 = async (event) => {
        setAdress(event.target.value)
    }


    return (
        <div>
                <div key={fullpriziv.surname}>
                    <ul>
                            <Link to="/priziv">Призывники</Link> / <Link to={`/${fullpriziv.surname}`}>{fullpriziv.surname}</Link>
                            <br/>
                            <div className={"surname"}><a>Фамилия: {fullpriziv.surname}</a> </div>
                            <div className={"surname"}><a>Имя: {fullpriziv.name}</a></div>
                            <div className={"surname"}><a>Отчество: {fullpriziv.patronymic}</a></div>
                            <div className={"surname"}><a>Категория: {fullpriziv.categoriya}</a></div>
                            <div className={"surname"}><a>Возраст: {fullpriziv.vozrast}</a></div>
                            <div className={"surname"}><a>Наличие отсрочки: {fullpriziv.otsrochka}</a></div>
                            <div className={"surname"}><a>Адрес: {fullpriziv.adress}</a></div>
                            <Button hidden={fullpriziv.otsrochka==="есть"} variant="primary" variant="dark" className="me-3" class="btn btn-light" onClick={()=>{otsrochkaCh1(fullpriziv)}}>Принес отсрочку</Button>
                            <Button hidden={fullpriziv.otsrochka==="нет"} variant="primary" variant="dark" className="me-3" class="btn btn-light" onClick={()=>{otsrochkaCh1(fullpriziv)}}>Действие отсрочки закончилось</Button>
                    </ul>
                </div>
                    <Button className="btn btn-dark" onClick={handleShow}>Изменить запись</Button>
                    <br/><br/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить запись</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder='Имя'
                            onChange={Input31}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder='Фамилия'
                            onChange={Input32}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder="Отчество"
                            onChange={Input33}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder="Возраст"
                            onChange={Input34}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder="Отсрочка"
                            onChange={Input35}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder="Категория"
                            onChange={Input36}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder="Адрес"
                            onChange={Input37}
                        />
                        <Form.Group>
                            <Button variant="primary" onClick={handleClose}>Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    );
}

export default FullPriziv;