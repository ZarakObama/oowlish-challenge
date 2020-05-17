import React, { Component } from 'react';
import Moment from 'react-moment';


class DataTable extends Component {
     TestExpWh(props) {
        const whs = this.props.obj.workinghours;
        var res = parseInt(whs.substring(0, 2));
        console.log(res);
         if(res>8)
         {
            return <p>Above the expected working hours</p>;
         }
         else 
         {
            return <p>Below the expected working hours</p>;
         }
        
      }
    
    render() {
      
        return (
            <tr>
                <td>
                <Moment format='MMMM Do YYYY'>{this.props.obj.workDay}</Moment>

                </td>
                <td>
                    {this.props.obj.arrivingHour}
                </td>
                <td>
                    {this.props.obj.exithour}
                </td>
                <td>
                    {this.props.obj.lunchbreak}
                </td>
                <td>
                    {this.props.obj.workinghours}
                </td>
                <td>
                {this.TestExpWh()}
                </td>
            </tr>
        );
    }
}

export default DataTable;