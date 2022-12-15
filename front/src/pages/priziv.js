import React, {useState, useEffect, useReducer} from 'react';
import "../App.css"
import {Link, useParams} from "react-router-dom";
import {Button,  Form, Modal} from "react-bootstrap";
import {GetPriziv} from "../context/provider";
import {initialState, reducer} from "../context/reducer";
import axios from "axios";

function Priziv() {
    const params = useParams();
    const prizivId = params.id

    const arm=(quantity, name, surname, vozrast, categoriya)=> {
        const ob = {
            quantity: quantity,
            name: name,
            surname: surname,
            vozrast: vozrast,
            categoriya: categoriya
        }
        fetch("http://127.0.0.1:8000/cart/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }


    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [patronymic, setPatronymic] = useState();
    const [vozrast, setVozrast] = useState();
    const [otsrochka, setOtsrochka] = useState();
    const [adress, setAdress] = useState();
    const [categoriya, setCategoriya] = useState();

    const handleClose2 = async ()=> {
        setShow2(false);
        await fetch(`http://127.0.0.1:8000/prizivniki/${getInterval(min_price, max_price, value)}`, {
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


    const handleClose3 = async ()=> {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('patronymic', patronymic)
        formData.append('vozrast', vozrast)
        formData.append('otsrochka', otsrochka)
        formData.append('adress', adress)
        formData.append('categoriya', categoriya)
        setShow3(false);
        await axios(`http://127.0.0.1:8000/prizivniki/`, {
            method: 'POST',
            data: formData,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":  `Token ${sessionStorage.getItem('token')}`,
            }

        })
            .then((result) => {
                setPriziv(result);
            })
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/prizivniki/${getInterval(min_price, max_price, value)}`, {
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

    const handleShow2 = ()=> setShow2(true);
    const handleShow3 = ()=> setShow3(true);


    const Input1 = async (event) => {
        setMin(event.target.value);
    }
    const Input2 = async (event) => {
        setMax(event.target.value)
    }
    const Input3 = async (event) => {
        setValue(event.target.value)
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

    const [min_price, setMin] = useState();
    const [max_price, setMax] = useState();
    const [value, setValue] = useState('');

    function getInterval (min_price, max_price, value) {
        if (min_price && max_price && value) {
            return `?vozrast_min=${min_price}&vozrast_max=${max_price}&surname=${value}`
        }
        if (min_price && max_price ) {
            return `?vozrast_min=${min_price}&vozrast_max=${max_price}`
        }
        if (min_price && value) {
            return `?vozrast_min=${min_price}&surname=${value}`
        }
        if (max_price && value) {
            return `?vozrast_max=${max_price}&surname=${value}`
        }
        if (min_price) {
            return `?vozrast_min=${min_price}`
        }
        if (max_price) {
            return `?vozrast_max=${max_price}`
        }
        if (value) {
            return `?surname=${value}`
        }
        return ('')

    }

    const [priziv, setPriziv] = useState([]);

    const del = (pk) => {
        fetch('http://127.0.0.1:8000/prizivniki/' + pk + '/', {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
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
            <Link to="/priziv">Призывники</Link>
            <div className={"assortment"}><h1>Призывники</h1></div>
            <img src={require('../fotki/main.jpeg')} width="280" height="255"/>
            <br/>
            <Button href="/priziv/cart" variant="dark" class="btn btn-dark">Список для отправки в армию</Button>
            <Button variant="primary" class="btn btn-dark" onClick={handleShow2}>Фильтр</Button>
            <Button variant="primary" class="btn btn-dark" onClick={handleShow3}>Добавить запись</Button>
            <Modal show={show2} onHide={handleClose2}>
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
                            <Button variant="primary" variant="dark" style={{right:0}} onClick={handleClose2}>Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                    <Modal.Title>Фильтр</Modal.Title>
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
                            <Button variant="primary" onClick={handleClose3}>Ok</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <div className={"priziv_list"}>
                {priziv.map(item => (
                    <div className={"priziv"} key={"surname:" + item.surname}>
                        <Link to={`/prizivniki/${item.pk}/`}>{item.surname} {item.name}<br/></Link>
                        <a>Наличие отсрочки: {item.otsrochka}</a><br/>
                        <Button variant="primary" variant="dark" className="me-2" class="btn btn-dark" onClick={()=>{arm(1 , item.name, item.surname, item.vozrast, item.categoriya, prizivId)}}>В армию</Button>
                        <Button variant="primary" variant="danger" className="me-2" class="btn btn-dark" onClick={()=>{del(item.pk)}}>Удалить</Button>
                        <br/>
                        <br/>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default Priziv;