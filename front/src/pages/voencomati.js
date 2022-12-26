import React, {useState} from 'react';
import {useEffect} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {GetVoencomati} from "../context/provider";

function Voencomati() {

    const voencomati = GetVoencomati()

    const handleClose2 = async ()=> {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('metro', metro)
        formData.append('adress', adress)
        setShow2(false);
        const ob = {
            name: name,
            metro: metro,
            adress: adress
        }
        await fetch(`http://127.0.0.1:8000/addVoenc/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                "Authorization":  `${sessionStorage.getItem('token')}`,
                "username": `${sessionStorage.getItem('username')}`,
            },
            body: JSON.stringify(ob)
        })
        window.location.reload()
    }

    const handleShow2 = ()=> setShow2(true);


    const [show2, setShow2] = useState(false);
    const [name, setName] = useState();
    const [metro, setMetro] = useState();
    const [adress, setAdress] = useState();

    const Input31 = async (event) => {
        setName(event.target.value);
    }
    const Input32 = async (event) => {
        setMetro(event.target.value)
    }
    const Input33 = async (event) => {
        setAdress(event.target.value)
    }


    const del = (pk) => {
        fetch('http://127.0.0.1:8000/delVoenc/' + pk + '/', {
            method: 'DELETE',
            headers:{
                "Authorization":  `${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify({"username": sessionStorage.getItem('username')})
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
        <div>
            <div className={"assortment"}><h1>Военкоматы Москвы</h1></div>
            <Button variant="primary" hidden={sessionStorage.getItem('username') !== 'megauser'} className="btn btn-dark" onClick={handleShow2}>Добавить военкомат</Button>
            <div className={"priziv_list"}>
                {voencomati.map(item => (
                    <div className={"priziv"} key={"surname:" + item.metro}>
                        <div className={"surname"}><a>Метро:</a> {item.metro}</div>
                        <div className={"surname"}><a>Название:</a> {item.name}</div>
                        <div className={"surname"}><a>Адрес:</a> {item.adress}<br/></div>
                        <Button variant="primary" hidden={sessionStorage.getItem('username') !== 'megauser'} className="btn btn-danger" onClick={()=>{del(item.pk)}}>Удалить военкомат</Button>
                    </div>
                ))}
            </div>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить запись</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder='Название'
                            onChange={Input31}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder='Метро'
                            onChange={Input32}
                        />
                        <Form.Control
                            type="text"
                            className="input"
                            placeholder="Адрес"
                            onChange={Input33}
                        />
                        <Form.Group>
                            <Button variant="primary" onClick={handleClose2}>Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Voencomati;