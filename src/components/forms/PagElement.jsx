import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    active: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,

    dinamicSetState: PropTypes.func.isRequired,
    setViewList: PropTypes.func.isRequired,
};


class PagElement extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            active: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        event.preventDefault();
        const newViewList = this.props.setViewList(undefined, this.props.number)
        this.props.dinamicSetState({ pageActive: this.props.number }, newViewList)
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.active === nextProps.number) {
            this.setState({active: 'active'})
        } else {
            this.setState({active: ''})
        }
    }
    

    render() {
        return (
            <div className={`row-elem ${this.state.active}`} onClick={this.handleClick} >{this.props.number}</div>
        );
    }
}


PagElement.propTypes = propTypes;


export default PagElement;
