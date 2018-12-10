import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    handleFindPreset: PropTypes.func.isRequired,
    dinamicSetState: PropTypes.func.isRequired,
    setViewList: PropTypes.func.isRequired,
};


class Finder extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

        }
        this.find = this.find.bind(this);
    }
    
    find(event) {
        event.preventDefault();
        let findPreset = {};

        for (const field in this.refs){
            findPreset[field] = this.refs[field].checked;
        }
        findPreset.text = this.refs.text.value;


        const serviceList = this.props.handleFindPreset(findPreset);
        const viewList = this.props.setViewList(undefined, 1, serviceList);
        this.props.dinamicSetState({serviceList}, viewList);
    }

    render() {
        return (
            <form onSubmit={this.find}>
                <input type="text" ref="text"/>
                <p>Поиск по:</p>
                <input type="checkbox" value='id' ref="id"/> ID <br />
                <input type="checkbox" value="firstName"  ref="firstName"/> Имени<br />
                <input type="checkbox" value="lastName"  ref="lastName"/> Фамилии<br />
                <input type="checkbox" value="email" ref="email"/> email<br />
                <input type="checkbox" value="phone" ref="phone"/> Номеру телефона<br />
                <button>Найти</button>
            </form>
        );
    }
}


Finder.propTypes = propTypes;


export default Finder;
