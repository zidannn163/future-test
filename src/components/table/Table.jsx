import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Description from './Description';
import Close from './Close';
import { dynamicSort } from '../../func/App';

const propTypes = {
    viewList: PropTypes.arrayOf(PropTypes.object).isRequired,
    pageCrop: PropTypes.number.isRequired,
    sortPreset: PropTypes.object.isRequired,
    serviceList: PropTypes.arrayOf(PropTypes.object).isRequired,

    dinamicSetState: PropTypes.func.isRequired,
    setViewList: PropTypes.func.isRequired,
};


class Table extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            descriptionRow: {},
            action: ''

        }
        this.sortColum = this.sortColum.bind(this);
        this.setDescription = this.setDescription.bind(this);
    }


    sortColum(sortParam, event) {

        event.preventDefault();
        let sortPreset = this.props.sortPreset;

        
        if (sortPreset.columName === sortParam) {
            const viewList = this.props.setViewList(undefined, 1, this.props.serviceList.reverse())
            const serviceList = this.props.serviceList;


            this.props.dinamicSetState(
                {sortPreset: { 
                    columName: sortPreset.columName, 
                    upToDown: !sortPreset.upToDown 
                }}, 
                viewList,
                {serviceList})

        } else {

            sortPreset = {
                columName: sortParam,
                upToDown: false
            }

            const serviceList = this.props.serviceList.sort(dynamicSort(sortPreset.upToDown, sortPreset.columName));
            const viewList = this.props.setViewList(undefined, 1, serviceList)

            this.props.dinamicSetState(
                {sortPreset, pageActive: 1},
                viewList, 
                {serviceList}
            )
        }
    }

    setDescription(Row = this.state.descriptionRow, action){

        this.setState(() => ({
            descriptionRow: Row,
            action: action
        }))
    }
    

    render() {

        return (
            <table className="main-table">
                <thead>
                    <tr>
                        <th onClick={(event) => this.sortColum( 'id', event)} >
                            Id 
                            {this.props.sortPreset.columName === 'id' &&
                                <i className={this.props.sortPreset.upToDown ? 'fa fa-sort-alpha-desc' : 'fa fa-sort-alpha-asc'} aria-hidden="true"></i>
                            }
                        </th>
                        <th onClick={(event) => this.sortColum( 'firstName', event)}>
                            Имя 
                            {this.props.sortPreset.columName === 'firstName' &&
                                <i className={this.props.sortPreset.upToDown ? 'fa fa-sort-alpha-desc' : 'fa fa-sort-alpha-asc'} aria-hidden="true"></i>
                            }
                        </th>
                        <th onClick={(event) => this.sortColum( 'lastName', event)}>
                            Фамилия  
                            {this.props.sortPreset.columName === 'lastName' &&
                                <i className={this.props.sortPreset.upToDown ? 'fa fa-sort-alpha-desc' : 'fa fa-sort-alpha-asc'} aria-hidden="true"></i>
                            }
                        </th>
                        <th onClick={(event) => this.sortColum( 'email', event)}>
                            email 
                            {this.props.sortPreset.columName === 'email' &&
                                <i className={this.props.sortPreset.upToDown ? 'fa fa-sort-alpha-desc' : 'fa fa-sort-alpha-asc'} aria-hidden="true"></i>
                            }
                        </th>
                        <th onClick={(event) => this.sortColum( 'phone', event)}>
                            Phone  
                            {this.props.sortPreset.columName === 'phone' &&
                                <i className={this.props.sortPreset.upToDown ? 'fa fa-sort-alpha-desc' : 'fa fa-sort-alpha-asc'} aria-hidden="true"></i>
                            }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.viewList.map( row => <Row row={row}
                                                          key={row.key} 
                                                          setDescription={this.setDescription} /> )
                    }

                    {this.state.action === "show"  &&
                        <Description description={this.state.descriptionRow}/>
                    }
                    {this.state.action === "show"  &&
                        <Close setDescription={this.setDescription}/>
                    }
                    
                </tbody>
            </table>
        );
    }
}


Table.propTypes = propTypes;


export default Table;

