import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Voencomati extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }

    }
    componentDidMount(){
        const res = fetch("http://127.0.0.1:8000/voencomati/")
        .then (res => res.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    items: result,
                });
            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
        //console.log(res)
    }
    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <p>ERROR</p>
        } else if (!isLoaded) {
            return <p>LOADING</p>
        } else {
            return (
                <div>
                    <div className={"assortment"}><h1>Военкоматы Москвы</h1><br/></div>
                    <div className={"priziv_list"}>

                        {items.map(item=>(
                            <div className={"priziv"} key={"surname:"+item.metro}>
                                <div className={"surname"}><a>Метро:</a> {item.metro}</div>
                                <div className={"surname"}><a>Название:</a> {item.name}</div>
                                <div className={"surname"}><a>Адрес:</a> {item.adress}<br/><br/></div>
                            </div>
                        ))}
                    </div>
                </div>


            );
        }
    }
}

export default Voencomati;