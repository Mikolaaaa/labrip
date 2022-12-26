import React, {useState, useEffect, useReducer} from 'react';
import "../App.css"
import {Link, useParams} from "react-router-dom";
import {Button, Container, Form, Modal, Row} from "react-bootstrap";
import axios from "axios";


function Priziv() {

    const params = useParams();
    const prizivId = params.id


    const arm=(name, surname, vozrast, categoriya, adress, otsrochka, patronymic, pk)=> {
        const current = new Date();
        const date_ozhid = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()} ${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        console.log(date_ozhid)
        const ob = {
            name: name,
            surname: surname,
            vozrast: vozrast,
            categoriya: categoriya,
            adress: adress,
            otsrochka: otsrochka,
            patronymic: patronymic,
            status: "ждет медосмотра",
            date_ozhid: date_ozhid,
            date_proh: null,
            date_kon: null,
            date_got: null,
            date_nach: null
        }
        fetch("http://127.0.0.1:8000/addCart/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
        fetch('http://127.0.0.1:8000/delPr1/' + pk + '/',{
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
        window.location.reload()
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

    const handleClose = async ()=> {
        setShow(false);
        await fetch(`http://127.0.0.1:8000/prizivniki/${getInterval(min_vozrast, max_vozrast, surnamefil)}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then((result) => {
                setPriziv(result);
            })
    }


    const handleClose2 = async ()=> {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('patronymic', patronymic)
        formData.append('vozrast', vozrast)
        formData.append('otsrochka', otsrochka)
        formData.append('adress', adress)
        formData.append('categoriya', categoriya)
        setShow2(false);
        const ob = {
            name: name,
            surname: surname,
            patronymic: patronymic,
            vozrast: vozrast,
            otsrochka: otsrochka,
            adress: adress,
            categoriya: categoriya,
        }
        console.log(ob);
        await fetch(`http://127.0.0.1:8000/addPr/`, {
            method: "post",
            headers:{
                'Content-Type': 'application/json',
                "Authorization":  `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
            body: JSON.stringify(ob)
        })
        await fetch(`http://127.0.0.1:8000/prizivniki/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${sessionStorage.getItem('token')}`,
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
                "Authorization":  `${sessionStorage.getItem('token')}`,
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
            headers:{
                "Authorization":  `${sessionStorage.getItem('token')}`,
                "username": sessionStorage.getItem('username')
            },
        })
            .then(res => {
                if (res.ok) {
                    console.log("HTTP request successful");
                } else {
                    console.log("HTTP request unsuccessful");
                }
            })
        window.location.reload()
    }


    return (
        <>
        <div>
            <div>
            <Link to="/priziv">Призывники</Link>
            <div className={"assortment"}><h1>Призывники</h1></div>
                <Button href="/priziv/cart" className="btn btn-dark me-2">Список для отправки в армию</Button>
            <Button className="btn btn-primary me-2" onClick={handleShow}>Фильтр</Button>
            <Button className="btn btn-primary me-2" onClick={handleShow2}>Добавить запись</Button>
                <Button variant="primary" hidden={sessionStorage.getItem('token') === 'undefined'}  className="btn btn-dark me-2" href="/archive" >Архив призывников</Button><br/><br/>
            <ul className={"priziv_list"}>
                {priziv.map(item =>
                    <div className={"priziv"} key={"surname:" + item.surname}><br/>
                            <Link to={`/prizivniki/${item.pk}/`}>{item.surname} {item.name}<br/></Link>
                            <a>Наличие отсрочки: {item.otsrochka}</a><br/>
                            <Button variant="primary" hidden={sessionStorage.getItem('token') === 'undefined'}  className="btn btn-dark me-2" onClick={()=>{arm(item.name, item.surname, item.vozrast, item.categoriya, item.adress, item.otsrochka, item.patronymic, item.pk, prizivId)}}>В армию</Button>
                            <Button variant="primary" hidden={sessionStorage.getItem('username') !== 'megauser'} className="btn btn-danger me-2" onClick={()=>{del(item.pk)}}>Удалить</Button>
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