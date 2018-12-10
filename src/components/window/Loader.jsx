import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Preloader from './Preloader';


const propTypes = {
    get: PropTypes.func.isRequired,
    handlerGet: PropTypes.func.isRequired,
    handlerError: PropTypes.func.isRequired,
    errorGet: PropTypes.string.isRequired,
};


class Loader extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            load: false
        }
        this.load = this.load.bind(this);
    }
    
    load(event, loadPreset){
        event.preventDefault();
        let path
        if (loadPreset) {
            path = "?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
        } else {
            path = "?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
        }
        this.setState({
            load: true
        })

        this.props.get(path, this.props.handlerGet, this.props.handlerError)
    }



    render() {
        return (
            <div className="wrapper">

                <div className="loader">
                    
                    {this.state.load === false  && 
                        <div>
                            <h1>Укажите количество загружаемых данных</h1>
                            <div className="change">
                                <button onClick={(event) => this.load(event, false)}>Маленькая выборка</button>
                                <button onClick={(event) => this.load(event, true)}>Крупная выборка</button>
                            </div>

                        </div>      
                    }       
                    
                    {this.state.load === true && this.props.errorGet === ''  &&  
                        <Preloader /> 
                    } 

                    {this.props.errorGet &&
                        <h1>{this.props.errorGet}</h1>
                    }
                </div>
            </div>

        );
    }
}


Loader.propTypes = propTypes;


export default Loader;

//  Почему нет заявление на кутиева о заведомо ложном доносе