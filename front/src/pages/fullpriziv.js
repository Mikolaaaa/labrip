import {Link, useParams} from "react-router-dom";
import "../App.css";
import {Button, Form, Modal} from "react-bootstrap";
import React, {useState, useEffect, useReducer} from 'react';
import axios from "axios";
import {GetPrizivnik} from "../context/provider";


function FullPriziv() {

    let ID = window.location.pathname.split('/');
    const fullpriziv = GetPrizivnik(ID[2])


    const [fullpriziv1, setFullpriziv1] = useState([]);
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
        let ID = window.location.pathname.split('/');
        await axios(`http://127.0.0.1:8000/prizivniki/${ID[2]}/` , {
            method: 'PUT',
            data: formData,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            }
        })
        await fetch(`http://127.0.0.1:8000/prizivniki/${ID[2]}/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then((result) => {
                setFullpriziv1(result);
            })
    }

    const otsrochkaCh = (fullpriziv1) => {
        let otsrochka_change = {
            "otsrochka": "есть",
        }
        fetch("http://127.0.0.1:8000/otsrochkach/" + fullpriziv1.pk + "/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
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
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
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

    const pokaz = (id1,id2) => {

    }




    return (
        <div>
                <div key={fullpriziv.surname}>
                    <ul>
                            <Link to="/priziv">Призывники</Link> / <Link to={`/${fullpriziv.surname}`}>{fullpriziv.surname}</Link>
                            <br/>
                            <img src={require(`../fotki/3.jpeg`)} width="240" height="255"/>
                            <div className={"surname"}><a>Фамилия: {fullpriziv.surname}</a> </div>
                            <div className={"surname"}><a>Имя: {fullpriziv.name}</a></div>
                            <div className={"surname"}><a>Отчество: {fullpriziv.patronymic}</a></div>
                            <div className={"surname"}><a>Категория: {fullpriziv.categoriya}</a></div>
                            <div className={"surname"}><a>Возраст: {fullpriziv.vozrast}</a></div>
                            <div className={"surname"}><a>Наличие отсрочки: {fullpriziv.otsrochka}</a></div>
                            <div className={"surname"}><a>Адрес: {fullpriziv.adress}</a></div>
                            <Button id="id1" onClick={()=>{pokaz('id1','id2')}}>проходит медосмотр</Button>
                            <Button id="id2" onClick={pokaz('id2','id3')} className="hide">медосмотр пройден</Button>
                            <Button id="id3" onClick={pokaz('id3','id4')} className="hide">готов к призыву</Button>
                            <Button id="id4" onClick={pokaz('id4','id1')} className="hide">призван</Button>
                            <Button variant="primary" variant="dark" className="me-3" class="btn btn-light" onClick={()=>{otsrochkaCh1(fullpriziv)}}>Наличие отсрочки: {fullpriziv1.otsrochka}</Button>
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