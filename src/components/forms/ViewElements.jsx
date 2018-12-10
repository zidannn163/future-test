import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    setPageCrop: PropTypes.func.isRequired,
    setViewList: PropTypes.func.isRequired,
    dinamicSetState: PropTypes.func.isRequired,
};


class ViewElements extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

        };
        this.setQtElements = this.setQtElements.bind(this);
    }
    
    setQtElements(event) {

        const newPageParams = this.props.setPageCrop(event.target.value);
        const newViewList = this.props.setViewList(newPageParams.pageCrop, newPageParams.pageActive);

        this.props.dinamicSetState(newPageParams, newViewList)
    }

    render() {
        return (
            <form onChange={this.setQtElements}>
                <input  type="radio" value="10" name="list" /> 10 <br />
                <input type="radio" defaultChecked value="25" name="list"/> 25 <br />
                <input type="radio" value="50" name="list" /> 50 <br />
            </form>
        );
    }
}


ViewElements.propTypes = propTypes;


export default ViewElements;
