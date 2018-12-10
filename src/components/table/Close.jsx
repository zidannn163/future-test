import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    setDescription: PropTypes.func.isRequired,
};


function Close(props) {
    return (
        <tr className="close">
            <td colSpan={5}>
                <button onClick={() => {props.setDescription(undefined, '')}}>Скрыть</button>    
            </td>
        </tr>
    );
};


Close.propTypes = propTypes;


export default Close;


