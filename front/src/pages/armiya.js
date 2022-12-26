import React, {useContext, useEffect, useState} from "react";
import "../App.css";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {GetArmiya} from "../context/provider";

function Cart() {


    const [cart2, setCart2] = useState([]);
    const [show, setShow] = useState(false);
    const [min_vozrast, setMin] = useState();
    const [max_vozrast, setMax] = useState();
    const [statusfil, setStatusfil] = useState('');



    const handleShow = ()=> setShow(true);

    const Input1 = async (event) => {
        setMin(event.target.value);
    }
    const Input2 = async (event) => {
        setMax(event.target.value)
    }
    const Input12 = async (event) => {
        setStatusfil(event.target.value)
    }


    function getInterval (min_vozrast, max_vozrast, statusfil) {
        if (min_vozrast && max_vozrast && statusfil) {
            return `?vozrast_min=${min_vozrast}&vozrast_max=${max_vozrast}&status=${statusfil}`
        }
        if (min_vozrast && max_vozrast ) {
            return `?vozrast_min=${min_vozrast}&vozrast_max=${max_vozrast}`
        }
        if (min_vozrast && statusfil) {
            return `?vozrast_min=${min_vozrast}&status=${statusfil}`
        }
        if (max_vozrast && statusfil) {
            return `?vozrast_max=${max_vozrast}&status=${statusfil}`
        }
        if (min_vozrast) {
            return `?vozrast_min=${min_vozrast}`
        }
        if (max_vozrast) {
            return `?vozrast_max=${max_vozrast}`
        }
        if (statusfil) {
            return `?status=${statusfil}`
        }
        return ('')

    }

    const handleClose = async ()=> {
        setShow(false);
        await fetch(`http://127.0.0.1:8000/cart/${getInterval(min_vozrast, max_vozrast, statusfil)}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then((result) => {
                setCart2(result);
            })
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/cart/${getInterval(min_vozrast, max_vozrast, statusfil)}`, {
            method: 'GET',
            headers:{
                "Authorization":  `Token ${sessionStorage.getItem('token')}`,
            }
        })
            .then(response => response.json())
            .then((result) => {
                setCart2(result);
            })
    }, []);



    const statusCh = (cart) => {
        let status_change
        const current = new Date();
        const date = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()} ${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        if (cart.status==="ждет медосмотра") {
            status_change = {
                "status": "проходит медосмотр",
                "date_ozhid": cart.date_ozhid,
                "date_proh": date,
                "date_kon": cart.date_kon,
                "date_got": cart.date_got,
                "date_nach": cart.date_nach
            }
        } else if (cart.status==="проходит медосмотр") {
            status_change = {
                "status": "медосмотр пройден",
                "date_ozhid": cart.date_ozhid,
                "date_proh": cart.date_proh,
                "date_kon": date,
                "date_got": cart.date_got,
                "date_nach": cart.date_nach
            }
        } else if (cart.status==="медосмотр пройден"){
            status_change = {
                "status": "готов к призыву",
                "date_ozhid": cart.date_ozhid,
                "date_proh": cart.date_proh,
                "date_kon": cart.date_kon,
                "date_got": date,
                "date_nach": cart.date_nach
            }
        }
        else if (cart.status==="готов к призыву"){
            status_change = {
                "status": "призван",
                "date_ozhid": cart.date_ozhid,
                "date_proh": cart.date_proh,
                "date_kon": cart.date_kon,
                "date_got": cart.date_got,
                "date_nach": date
            }
        }
        fetch("http://127.0.0.1:8000/statusch/" + cart.pk + "/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
            body: JSON.stringify(status_change)
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

    const priz=(name, surname, patronymic, vozrast, otsrochka, adress, categoriya, pk)=> {
        const ob1 = {
            name: name,
            surname: surname,
            vozrast: vozrast,
            categoriya: categoriya,
            adress: adress,
            otsrochka: otsrochka,
            patronymic: patronymic
        }
        fetch("http://127.0.0.1:8000/addPr/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
            body: JSON.stringify(ob1)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
        fetch('http://127.0.0.1:8000/del/' + pk + '/',{
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
        window.location.reload();
    }


    const archiv=(name, surname, patronymic, vozrast, otsrochka, adress, categoriya, pk)=> {
        const ob1 = {
            name: name,
            surname: surname,
            vozrast: vozrast,
            categoriya: categoriya,
            adress: adress,
            otsrochka: otsrochka,
            patronymic: patronymic
        }
        fetch("http://127.0.0.1:8000/addOts/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
            body: JSON.stringify(ob1)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
        fetch('http://127.0.0.1:8000/del/' + pk + '/',{
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


    return(
        <div>
            <a href={`../`}>Начало/</a>
            <a href={`/priziv/`}>Призывники/</a>
            <a href = {'/priziv/cart'}>Армия/</a>
            <br/>
            <h1>Список людей для отправки в армию</h1>
            <Button className="btn btn-dark me-2" onClick={handleShow}>Фильтр</Button>
            <ul className={"priziv_list"}>
                {cart2.map(cart =>
                    <div key = {cart.surname} className="priziv">
                        <div className={"surname"}><a>Номер призывника: {cart.pk}</a></div>
                        <div className={"surname"}><a>Фамилия: {cart.surname}</a></div>
                        <div className={"surname"}><a>Имя: {cart.name}</a></div>
                        <div className={"surname"}><a>Возраст: {cart.vozrast}</a></div>
                        <div className={"surname"}><a>Категория: {cart.categoriya}</a></div>
                        <div className={"surname"}><a>Статус: {cart.status}</a></div>
                        <div className={"surname"} hidden={(cart.date_ozhid===null)}><a>Время добавления: {cart.date_ozhid}</a></div>
                        <div className={"surname"} hidden={(cart.date_proh===null)}><a>Время назначения медосмотра: {cart.date_proh}</a></div>
                        <div className={"surname"} hidden={(cart.date_kon===null)}><a>Время окончания прохождения медосмотра: {cart.date_kon}</a></div>
                        <div className={"surname"} hidden={(cart.date_got===null)}><a>Время результатов медосмотра: {cart.date_got}</a></div>
                        <div className={"surname"} hidden={(cart.date_nach===null)}><a>Время начала службы: {cart.date_nach}</a></div>
                        <Button hidden={(cart.status!=="ждет медосмотра")} className="btn btn-dark me-2" onClick={()=>{statusCh(cart)}}>Назначить медосмотр</Button>
                        <Button hidden={(cart.status!=="проходит медосмотр")} className="btn btn-dark me-2" onClick={()=>{statusCh(cart)}}>Медосмотр прошел</Button>
                        <Button hidden={(cart.status!=="медосмотр пройден")} className="btn btn-dark me-2" onClick={()=>priz(cart.name, cart.surname, cart.patronymic, cart.vozrast, cart.otsrochka, cart.adress, cart.categoriya, cart.pk)}>Не годен</Button>
                        <Button hidden={(cart.status!=="медосмотр пройден")} className="btn btn-dark me-2" onClick={()=>{statusCh(cart)}}>Годен</Button>
                        <Button hidden={(cart.status!=="готов к призыву")} className="btn btn-dark me-2" onClick={()=>{statusCh(cart)}}>Призвать</Button>
                        <Button hidden={(cart.status!=="призван") || (sessionStorage.getItem('username') !== 'megauser')} className="btn btn-dark me-2" onClick={()=>{archiv(cart.name, cart.surname, cart.patronymic, cart.vozrast, cart.otsrochka, cart.adress, cart.categoriya, cart.pk)}}>Отслужил</Button>
                        <Button hidden={sessionStorage.getItem('username') !== 'megauser'} variant="danger" className="btn btn-danger me-2" onClick={()=>{priz(cart.name, cart.surname, cart.patronymic, cart.vozrast, cart.otsrochka, cart.adress, cart.categoriya, cart.pk)}}>Вернуть домой</Button>
                    </div>)}
            </ul>
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
                            placeholder="Статус"
                            onChange={Input12}
                        />
                        <Form.Group>
                            <Button variant="primary" variant="dark" style={{right:0}} onClick={handleClose}>Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <br/>
        </div>
    )

}

export default Cart;