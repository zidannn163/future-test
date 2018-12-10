import React, { Component } from 'react';
import Finder from './components/forms/Finder';
import ViewElements from './components/forms/ViewElements';
import Pagination from './components/forms/Pagination';
import Table from './components/table/Table';
import Loader from './components/window/Loader';

import {degr} from './func/App';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

            pageCrop: 25,       // Количество элементов на странице
            pageActive: 1,      // Номер отображаемой страницы
            totalPages: 1,

            fullList: [],    // Загруженный массив с сервера
            serviceList: [],     // остаток после запроса на поиск

            viewList: [],       // Массив отображаемых элементов на странице

            sortPreset: {       // Параметры сортировки
                columName: '',
                upToDown: true
            },

            findPreset: {      // Параметры поиска
                text: '',
                id: false,
                firstName: false, 
                lastName: false, 
                email: false, 
                phone: false 
            },
            formType: 'loader',  // loader/list

            errorGet: ''
        }
        this.setPageCrop = this.setPageCrop.bind(this);
        this.setViewList = this.setViewList.bind(this);
        this.get = this.get.bind(this);
        this.handlerGet = this.handlerGet.bind(this);
        this.handlerError = this.handlerError.bind(this);
        this.dinamicSetState = this.dinamicSetState.bind(this);
        this.handleFindPreset = this.handleFindPreset.bind(this);
    }

    get(path, done, errorDone) {

        fetch(`http://www.filltext.com/${path}`) 
            .then(res => res.json())
            .then(params =>  done(params))
            .catch(err => errorDone(err.message)) 
    }

    handlerGet(fullList) {
        if (fullList === []) {
            this.setState({
                errorGet: "Сервер вернул пустой объект данных"
            })
        } else {

            const serviceList = fullList;
            
            const viewList = this.setViewList(undefined, undefined, serviceList);

            this.dinamicSetState({
                pageActive: 1,
                formType: "list",
                fullList,
                serviceList       
            },  
            viewList)

        }
    }

    handlerError(errorGet){

        this.setState({             // кандидат на вынос
            errorGet, 
            formType: 'loader'
        })
    }
    //___________________________________________//

    setPageCrop(value) {                            // Переопределение количества отображаемых элементов
                                                    // сброс на первую страницу 
        const pageCrop = parseInt(value, 10);
        const pageActive = 1;                       // кандидат на вынос

        return {pageCrop, pageActive}
    }

    setViewList(pageCrop = this.state.pageCrop, pageActive = this.state.pageActive, serviceList = this.state.serviceList ) { 
                                                                // Определение массива отображаемых элементова
                                                                // Кандидат на вынос
                                                              
        const startItem = ( pageActive - 1 ) * pageCrop;
        const endItem   = startItem + pageCrop;
        const viewList  = serviceList.slice(startItem, endItem);

        const totalPages =  degr( serviceList.length, pageCrop ) // лишняя работа при смене страницы

        for ( let index in viewList ) {                                                    
            viewList[index].key = index;
        }

        return {viewList, totalPages}
    }



    dinamicSetState(){  // setState для списка объектов

        let state = {}

        Array.prototype.forEach.call(arguments, (value) => {
            for ( let key in value ) {
                state[key] = value[key];       
            }
        })

        this.setState(state)
    }

    handleFindPreset(findPreset) {

        let activeParams = [];
        const text = findPreset.text;
        
        if (text === '') {
            return this.state.fullList
        }

        for ( let key in findPreset) {          
            if (findPreset[key] === true) {
                activeParams.push(key)
            }
        }


        const serviceList = this.state.fullList.filter( row  => {
            for ( let params of activeParams ) {

                if ( String(row[params]).indexOf(text) + 1 )  {
                    return true
                }

            }

            return false
        })

        return serviceList
        
    }


    render() {
        
        return (
            <div className="wrapper"> 

                <div className="nav">
                    <h2>Поиск</h2>

                    <Finder handleFindPreset={this.handleFindPreset}
                            dinamicSetState={this.dinamicSetState}
                            setViewList={this.setViewList}/>

                    <h2>Отобразить элементов на странице:</h2>

                    <ViewElements setPageCrop={this.setPageCrop}
                                  setViewList={this.setViewList}
                                  dinamicSetState={this.dinamicSetState}/>

                    <div className="pages">
                        <h2>Страница:</h2>

                        <Pagination totalPages={this.state.totalPages}
                                    pageActive={this.state.pageActive}
                                    dinamicSetState={this.dinamicSetState}
                                    setViewList={this.setViewList}/>

                    </div>
                </div>

                {this.state.formType === 'loader' &&

                    <Loader get={this.get}
                            handlerGet={this.handlerGet}
                            handlerError={this.handlerError}
                            errorGet={this.state.errorGet}/>

                }
                {this.state.formType === 'list' &&

                    <div className="list">
                    <Table pageCrop={this.state.pageCrop}
                           viewList={this.state.viewList}
                           sortPreset={this.state.sortPreset}
                           serviceList={this.state.serviceList}

                           dinamicSetState={this.dinamicSetState}
                           setViewList={this.setViewList}/>
                    </div> 
                }               
            </div>
        );
    }
}

export default App;
