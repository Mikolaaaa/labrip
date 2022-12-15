import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../App.css";
import {GetCart} from "../context/provider";
import {Button} from "react-bootstrap";


function Cart(){

    const del = (pk) => {
        fetch('http://127.0.0.1:8000/cart/' + pk + '/', {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
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
        <div>
            <a href={`../`}>Начало/</a>
            <a href={`/priziv/`}>Призывники/</a>
            <a href = {'/priziv/cart'}>Армия/</a>
            <br/>
            <h1>Список людей для отправки в армию</h1>
            {GetCart().map(cart =>
                <div key = {cart.surname} className="priziv">
                    <div className={"surname"}><a>Фамилия: {cart.surname}</a></div>
                    <div className={"surname"}><a>Имя: {cart.name}</a></div>
                    <div className={"surname"}><a>Возраст: {cart.vozrast}</a></div>
                    <div className={"surname"}><a>Категория: {cart.categoriya}</a></div>
                    <Button variant="danger" class="btn btn-dark" onClick={()=>{del(cart.pk)}}>Вернуть домой</Button>
                </div>)}
            <br/>
            <Button variant="dark" class="btn btn-dark">Отправить служить</Button><br/><br/>
        </div>
    );
}
export default Cart;