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
                    <div className={"name"}><a>Фамилия:</a> {cart.surname}</div>
                    <div className={"name"}><a>Имя:</a> {cart.name}</div>
                    <div className={"name"}><a>Возраст:</a> {cart.vozrast}</div>
                    <div className={"name"}><a>Категория:</a> {cart.categoriya}</div>
                    <Button variant="danger" class="btn btn-dark" onClick={()=>{del(cart.pk)}}>Вернуть домой</Button>
                </div>)}
            <br/>
            <Button variant="dark" class="btn btn-dark">Отправить служить</Button><br/><br/>
        </div>
    );
}
export default Cart;