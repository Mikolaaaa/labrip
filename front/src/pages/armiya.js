import React, {useContext, useEffect, useState} from "react";
import "../App.css";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";

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

    const del = (pk) => {
        fetch('http://127.0.0.1:8000/del/' + pk + '/', {
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

    const statusCh = (cart) => {
        let status_change
        if (cart.status==="ждет медосмотра") {
            status_change = {
                "status": "проходит медосмотр",
            }
        } else if (cart.status==="проходит медосмотр") {
            status_change = {
                "status": "медосмотр пройден",
            }
        } else if (cart.status==="медосмотр пройден"){
            status_change = {
                "status": "готов к призыву",
            }
        }
        else if (cart.status==="готов к призыву"){
            status_change = {
                "status": "призван",
            }
        }else if (cart.status==="приван"){
            status_change = {
                "status": "призван",
            }
        }
        fetch("http://127.0.0.1:8000/statusch/" + cart.pk + "/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
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


    const statusCh1 = (cart) => {
        let status_change = {
            "status": "готов к призыву",
        }
        fetch("http://127.0.0.1:8000/statusch/" + cart.pk + "/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
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

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/cart/`, {
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
                        <Button variant="primary" variant="dark" className="btn btn-dark me-2" onClick={()=>{statusCh(cart)}}>Сменить статус</Button><br/><br/>
                        <Button variant="danger" className="btn btn-danger me-2" onClick={()=>{del(cart.pk)}}>Вернуть домой</Button>
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
            <Button variant="dark" className="btn-dark">Отправить служить</Button><br/><br/>
        </div>
    )

}

export default Cart;