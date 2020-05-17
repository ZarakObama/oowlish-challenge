import React, { useState, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";



const dateNow = new Date();
const year = dateNow.getFullYear();
const monthWithOffset = dateNow.getUTCMonth() + 1;
const month =
  monthWithOffset.toString().length < 2
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const materialDateInput = `${year}-${month}-${date}`;
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

class AddTiming extends Component {
  constructor(props) {
    super(props);
    this.submitFormHandler = this.submitFormHandler.bind(this);

    this.state = {
      workdate: materialDateInput,
      Arrhour: "",
      Exhour: "",
      lunchbreak: "",
    };
  }


  submitFormHandler(event) {
    event.preventDefault();
    Axios.post("http://localhost:4000/workinghours", {
      workDay: this.state.workdate,
      arrivingHour: this.state.Arrhour,
      exithour: this.state.Exhour,
      lunchbreak: this.state.lunchbreak,
      userId: this.props.user
    })
      .then(function (response) {
        document.workinghours.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-3">
        <form noValidate name="workinghours" onSubmit={this.submitFormHandler}>
          <div className="form-group">
            <label htmlFor="workday">Choose your work day </label>
            <TextField
              id="workdate"
              name="workdate"
              label=""
              value={this.state.workdate}
              type="date"
              className={useStyles.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                this.setState({
                  workdate: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="Arrhour">Arriving hour</label>

            <TextField
              id="Arrhour"
              name="Arrhour"
              type="time"
              className={useStyles.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.Arrhour}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={(e) =>
                this.setState({
                  Arrhour: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="Exhour">Exit hour</label>
            <TextField
              id="Exhour"
              name="Exhour"
              type="time"
              className={useStyles.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.Exhour}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={(e) =>
                this.setState({
                  Exhour: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="lunchbreak">Lunch break</label>
            <TextField
              id="lunchbreak"
              name="lunchbreak"
              type="time"
              className={useStyles.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              value={this.state.lunchbreak}
              onChange={(e) =>
                this.setState({
                  lunchbreak: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <button   type="submit" className="btn btn-primary">Add my working hours</button>
          </div>
        </form>
      </div>
    );
  }
}
/* 
  import {withRouter} from 'react-router-dom';
  nextPath(path) {
    this.props.history.push(path);
  }
<button onClick={() => this.nextPath('/show') } 
export default withRouter(AddTiming);
*/
export default AddTiming;
