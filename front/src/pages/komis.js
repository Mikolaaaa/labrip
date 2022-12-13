import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {GetPriziv} from "../context/provider";


function Komissar() {
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/komissar/`)
            .then(response => response.json())
            .then((result) => {
                setKomissar(result);
            })
    }, []);

    const [komissar, setKomissar] = useState([]);

    const [priziv, setPriziv] = useState([]);


    return (
        <div>
            <Link to="/komissar">Комиссары</Link><br/>
            <Button href="/priziv" variant="dark" style={{width:350, height:50, fontSize:20}}>Призывники (для авторизированных)</Button>
            <div className={"assortment"}><h1>Военные комиссары</h1><br/></div>
            <div className={"priziv_list"}>

                {komissar.map(item => (
                    <div className={"priziv"} key={"surname:" + item.surname}>
                        <div className={"patronymic"}>{item.surname} {item.name} {item.patronymic}</div>
                        <div className={"surname"}><a>Ранг:</a> {item.rang}<br/><br/></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Komissar;