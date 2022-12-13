import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import '../App.css';

export const Back = () => {
    let history = useHistory();
    return (
        <div className={"back_button"}>
            <Button variant="warning" onClick={() => history.goBack()}>На предыдущую страницу</Button>
        </div>
    );
};

export default Back;