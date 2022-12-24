import React, {useState, useEffect, useReducer} from 'react';
import "../App.css"
import {Link, useParams} from "react-router-dom";
import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import axios from "axios";


function Priziv() {

    const params = useParams();
    const prizivId = params.id


    const arm=(name, surname, vozrast, categoriya)=> {
        const ob = {
            session_cookie: sessionStorage.getItem('token'),
            name: name,
            surname: surname,
            vozrast: vozrast,
            categoriya: categoriya,
            status: "ждет медосмотра",
        }
        fetch("http://127.0.0.1:8000/addPr/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }


    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [patronymic, setPatronymic] = useState();
    const [vozrast, setVozrast] = useState();
    const [otsrochka, setOtsrochka] = useState();
    const [adress, setAdress] = useState();
    const [categoriya, setCategoriya] = useState();
    const [status, setStatus] = useState();
    const [ID, setID] = useState();

    const handleClose = async ()=> {
        setShow(false);
        await fetch(`http://127.0.0.1:8000/prizivniki/${getInterval(min_vozrast, max_vozrast, surnamefil)}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then((result) => {
                setPriziv(result);
            })
    }


    const handleClose2 = async ()=> {
        const formData = new FormData()
        formData.append('ID', ID)
        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('patronymic', patronymic)
        formData.append('vozrast', vozrast)
        formData.append('otsrochka', otsrochka)
        formData.append('adress', adress)
        formData.append('categoriya', categoriya)
        formData.append('status', status)
        setShow2(false);
        await axios(`http://127.0.0.1:8000/prizivniki/`, {
            method: 'POST',
            data: formData,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":  `Token ${sessionStorage.getItem('token')}`,
            }
        })
        await fetch(`http://127.0.0.1:8000/prizivniki/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then((result) => {
                setPriziv(result);
            })
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/prizivniki/${getInterval(min_vozrast, max_vozrast, surnamefil)}`, {
            method: 'GET',
            headers:{
                "Authorization":  `Token ${sessionStorage.getItem('token')}`,
            }
        })
            .then(response => response.json())
            .then((result) => {
                setPriziv(result);
            })
    }, []);

    const handleShow = ()=> setShow(true);
    const handleShow2 = ()=> setShow2(true);


    const Input1 = async (event) => {
        setMin(event.target.value);
    }
    const Input2 = async (event) => {
        setMax(event.target.value)
    }
    const Input3 = async (event) => {
        setSurnamefil(event.target.value)
    }
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
    const Input38 = async (event) => {
        setStatus(event.target.value)
    }
    const Input44 = async (event) => {
        setID(event.target.value)
    }

    const [min_vozrast, setMin] = useState();
    const [max_vozrast, setMax] = useState();
    const [surnamefil, setSurnamefil] = useState('');

    function getInterval (min_vozrast, max_vozrast, surnamefil) {
        if (min_vozrast && max_vozrast && surnamefil) {
            return `?vozrast_min=${min_vozrast}&vozrast_max=${max_vozrast}&surname=${surnamefil}`
        }
        if (min_vozrast && max_vozrast ) {
            return `?vozrast_min=${min_vozrast}&vozrast_max=${max_vozrast}`
        }
        if (min_vozrast && surnamefil) {
            return `?vozrast_min=${min_vozrast}&surname=${surnamefil}`
        }
        if (max_vozrast && surnamefil) {
            return `?vozrast_max=${max_vozrast}&surname=${surnamefil}`
        }
        if (min_vozrast) {
            return `?vozrast_min=${min_vozrast}`
        }
        if (max_vozrast) {
            return `?vozrast_max=${max_vozrast}`
        }
        if (surnamefil) {
            return `?surname=${surnamefil}`
        }
        return ('')

    }

    const [priziv, setPriziv] = useState([]);

    const del = (pk) => {
        fetch('http://127.0.0.1:8000/delPr/' + pk + '/', {
            method: 'DELETE',
            body: JSON.stringify({"session_cookie": sessionStorage.getItem('token')})
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


    return (
        <>
        <div>
            <div>
            <Link to="/priziv">Призывники</Link>
            <div className={"assortment"}><h1>Призывники</h1></div>
            <img src={require('../fotki/4.jpeg')} width="250" height="255"/>
            <br/>
            <Button href="/priziv/cart" className="btn btn-dark me-2">Список для отправки в армию</Button>
            <Button className="btn btn-primary me-2" onClick={handleShow}>Фильтр</Button>
            <Button className="btn btn-primary" onClick={handleShow2}>Добавить запись</Button><br/><br/>
                <div className="dropdown">
                            <Button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Кнопка выпадающего списка
                            </Button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">Действие</a></li>
                                <li><a className="dropdown-item" href="#">Другое действие</a></li>
                                <li><a className="dropdown-item" href="#">Что-то еще здесь</a></li>
                            </ul>
                        </div>
            <ul className={"priziv_list"}>
                {priziv.map(item =>
                    <div className={"priziv"} key={"surname:" + item.surname}><br/>
                            <Link to={`/prizivniki/${item.pk}/`}>{item.surname} {item.name}<br/></Link>
                            <a>ID: {item.pk}</a><br/>
                            <a>Наличие отсрочки: {item.otsrochka}</a><br/>

                            <Button variant="primary" className="btn btn-dark me-2" onClick={()=>{arm(item.name, item.surname, item.vozrast, item.categoriya, prizivId)}}>В армию</Button>
                            <Button variant="primary" className="btn btn-danger me-2" disabled={sessionStorage.getItem('token') != 'a9b7c2262ffcefde2943e9054acbf5788dd5eebb'}  onClick={()=>{del(item.pk)}}>Удалить</Button>
                        <br/>
                        <br/>
                    </div>
                )}
            </ul>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Фильтр</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="text"
                            placeholder='Минимальный возраст'
                            onChange={Input1}
                        />
                        <Form.Control
                            type="text"
                            placeholder='Максимальный возраст'
                            onChange={Input2}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Фамилия"
                            onChange={Input3}
                        />
                        <Form.Group>
                            <Button variant="primary" variant="dark" style={{right:0}} onClick={handleClose}>Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить запись</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder='ID'
                            onChange={Input44}
                        />
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
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder="Статус"
                            onChange={Input38}
                        />
                        <Form.Group>
                            <Button variant="primary" onClick={handleClose2}>Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
        </>
    );
}

export default Priziv;