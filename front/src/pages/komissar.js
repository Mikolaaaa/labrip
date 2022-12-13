import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import {KomissarContext} from "../context/context"



function Komissar() {

    const komissars = useContext(KomissarContext);

    return (
        <div>

            <ul>
                {komissars.map(item =>
                    <div className={"priziv"} key={"surname:" + item.surname}>
                        <div className={"patronymic"}>{item.surname} {item.name} {item.patronymic}</div>
                        <div className={"surname"}><a>Ранг:</a> {item.rang}<br/><br/></div>
                    </div>
                )}
            </ul>
        </div>
    );
}

export default Komissar;