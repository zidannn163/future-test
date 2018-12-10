import React from 'react';
import PropTypes from 'prop-types';
import logo from './unknowPerson.jpg';


const propTypes = {
    description: PropTypes.object.isRequired,
};


function Description(props) {
    return (
        <tr className="description">
        
            <td colSpan={3}>
                <p>Выбран пользователь: <b>{props.description.firstName}</b></p> 
                <p>Описание:</p> 
                <textarea readOnly value={props.description.description} />
                <p> Адрес проживания: <b>{props.description.address.streetAddress}</b></p>
                <p>Город: <b>{props.description.address.city}</b></p>
                <p>Провинция/штат: <b>{props.description.address.state}</b></p>
                <p>Индекс: <b>{props.description.address.zip}</b></p>
            </td>  
            <td colSpan={2}>
                <img src={logo} alt='logo' />
            </td>   
        </tr>
    );
};


Description.propTypes = propTypes;


export default Description;

