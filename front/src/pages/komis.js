import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {GetKomissar} from "../context/provider";


function Komissar() {

    const komissar = GetKomissar()

    const handleClose2 = async ()=> {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('patronymic', patronymic)
        formData.append('rang', rang)
        setShow2(false);
        const ob = {
            name: name,
            surname: surname,
            patronymic: patronymic,
            rang: rang
        }
        await fetch(`http://127.0.0.1:8000/addKom/`, {
            method: "post",
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
    const [surname, setSurname] = useState();
    const [patronymic, setPatronymic] = useState();
    const [rang, setRang] = useState();

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
        setRang(event.target.value)
    }

    const del = (pk) => {
        fetch('http://127.0.0.1:8000/delKom/' + pk + '/', {
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
            <Link to="/komissar">Комиссары</Link><br/>
            <div className={"assortment"}><h1>Военные комиссары</h1></div>
            <Button variant="primary" hidden={sessionStorage.getItem('username') !== 'megauser'} className="btn btn-dark" onClick={handleShow2}>Добавить комиссара</Button>
            <div className={"priziv_list"}>
                {komissar.map(item => (
                    <div className={"priziv"} key={"surname:" + item.surname}>
                        <div className={"patronymic"}>{item.surname} {item.name} {item.patronymic}</div>
                        <div className={"surname"}><a>Ранг:</a> {item.rang}<br/></div>
                        <Button variant="primary" hidden={sessionStorage.getItem('username') !== 'megauser'} className="btn btn-danger" onClick={()=>{del(item.pk)}}>Удалить комиссара</Button>
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
                            placeholder="Ранг"
                            onChange={Input34}
                        />
                        <Form.Group>
                            <Button variant="primary" onClick={handleClose2}>Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Komissar;