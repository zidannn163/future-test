
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    row: PropTypes.object.isRequired,
    setDescription: PropTypes.func.isRequired,
};


class Row extends Component {

    constructor(props) {
        super(props);
         this.state = {

         }
         this.showDescription = this.showDescription.bind(this);
    }
    
    showDescription(event){
        event.preventDefault();

        this.props.setDescription(this.props.row, "show")

    }

    render() {
        return (
            <tr className="stnd"  onClick={this.showDescription} >
                <td>{this.props.row.id}</td>
                <td>{this.props.row.firstName}</td>
                <td>{this.props.row.lastName}</td>
                <td>{this.props.row.email}</td>
                <td>{this.props.row.phone}</td>
            </tr>
        );
    }
}


Row.propTypes = propTypes;


export default Row;

