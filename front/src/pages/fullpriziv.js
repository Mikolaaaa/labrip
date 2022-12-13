import React, { useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {GetPrizivnik} from "../context/provider";


function FullPriziv() {

    const params = useParams();
    const priziv_id = params.id
    const fullpriziv = GetPrizivnik(priziv_id)


    return (
        <div>
                <div key={fullpriziv.id}>
                    <ul>
                        <Link to="/priziv">Призывники</Link> / <Link to={`/${fullpriziv.surname}`}>{fullpriziv.surname}</Link>
                        <br/>
                        <img src={require(`../fotki/3.jpeg`)} width="240" height="255"/>
                        <div className={"name"}><a>Фамилия: {fullpriziv.surname}</a> </div>
                        <div className={"name"}><a>Имя: {fullpriziv.name}</a></div>
                        <div className={"name"}><a>Отчество: {fullpriziv.patronymic}</a></div>
                        <div className={"name"}><a>Категория: {fullpriziv.categoriya}</a></div>
                        <div className={"name"}><a>Возраст: {fullpriziv.vozrast}</a></div>
                        <div className={"name"}><a>Наличие отсрочки: {fullpriziv.otsrochka}</a></div>
                        <div className={"name"}><a>Адрес: {fullpriziv.adress}</a></div>
                    </ul>
                </div>
            </div>

    );
}

export default FullPriziv;