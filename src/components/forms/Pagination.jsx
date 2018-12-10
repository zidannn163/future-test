import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PagElement from './PagElement';

import { generateArr } from '../../func/App';



const propTypes = {
    totalPages: PropTypes.number.isRequired,
    pageActive: PropTypes.number.isRequired,

    dinamicSetState: PropTypes.func.isRequired,
    setViewList: PropTypes.func.isRequired,
};



class Pagination extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            activePage: this.props.pageActive,
            leftShift: 0,
            pagesNums: []
        };
        this.toLeft = this.toLeft.bind(this);
        this.toRight = this.toRight.bind(this);
    }
    
    toLeft() {
        if (this.state.leftShift < 0) {
            this.setState({
                leftShift: this.state.leftShift + 20
            })

        }
    }

    toRight() {
        if (this.state.leftShift > -20*(this.props.totalPages - 7)) {
            this.setState({
                leftShift: this.state.leftShift - 20
            })
        }
    }

    
    componentWillReceiveProps(nextProps) {

        this.setState({
            pagesNums: generateArr(nextProps.totalPages)
        })
        
    }

    render() {
        return (
            <div className="pagination">

                <div className="left" onClick={this.toLeft}><i className="fa fa-arrow-circle-left" aria-hidden="true" /> </div>
                <div className="box">
                    <div className="row" style={{left: `${this.state.leftShift}px`}}>
                    {this.state.pagesNums.map( elem => <PagElement  key={elem}
                                                                    active={this.props.pageActive}
                                                                    number={elem}
                                                                    dinamicSetState={this.props.dinamicSetState}
                                                                    setViewList={this.props.setViewList}/>)}
                        
                    </div>
                </div>
                <div className="right" onClick={this.toRight}><i className="fa fa-arrow-circle-right" aria-hidden="true" /></div>
            </div>
        );
    }
}


Pagination.propTypes = propTypes;


export default Pagination;
