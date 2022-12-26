import React from "react"
import "../App.css"
import {Button} from "react-bootstrap";


function Nav() {

    const Vihod = () =>{

        fetch("http://127.0.0.1:8000/rest-auth/logout/", {
            method: "post",
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                sessionStorage.removeItem('token')
                localStorage.removeItem('user_id')
                localStorage.removeItem('user_login')
                localStorage.removeItem('user_status')
            })
            .catch(function (reason) {
                console.log(reason);
            })



    }

    return (
        <div className="topnav">
                  <Button className="active outline-dark" variant="outline-dark"  onClick={Vihod} href="/">Выход</Button>
                  <Button variant="outline-dark dark" hidden={sessionStorage.getItem('token') === 'undefined'} href="/priziv">Призывники</Button>
                  <Button variant="outline-dark" href="/komissar">Военкомы</Button>
                  <Button variant="outline-dark" href="/voencomati">Военкоматы</Button>
        </div>

    );
}

export default Nav;