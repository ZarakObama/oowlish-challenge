import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './data-table';

export default class ShowTiming extends Component {

    constructor(props) {
        super(props);
        this.state = { whCollection: [] };
    }
    componentDidMount() {

    if(this.props.user.role == "employee")
    {
        const userId = this.props.user.id;
        const url = `http://localhost:4000/workinghours/${userId}`;
        //console.log(this.props.user.role);
        axios.get(url)
            .then(res => {
                this.setState({ whCollection: res.data });
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            
    }
    else if (this.props.user.role == "manager")
    {
        axios.get('http://localhost:4000/workinghours/')
        .then(res => {
            this.setState({ whCollection: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    }

        
    }

    dataTable() {
        return this.state.whCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }


    render() {
        return (
            
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>workDay</td>
                                <td>arrivingHour</td>
                                <td>exithour</td>
                                <td>lunchbreak</td>
                                <td>workinghours</td>
                                <td>More info</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}