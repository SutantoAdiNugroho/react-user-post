import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { Formik, ErrorMessage } from "formik";
import swal from 'sweetalert2'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },

}));

const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

export default class TodoMongoose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    showTodo = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        axios
            .get(`https://api-live-mongodb-mongoose-adi.herokuapp.com/todos/`)
            .then(response => {
                this.setState({ data: response.data.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount = () => {
       this.showTodo()
    }

    addOne = values => {
        const user = JSON.parse(localStorage.getItem("user"));

        axios
            .post(`https://api-live-mongodb-mongoose-adi.herokuapp.com/todos/`, {
                ...values,
                status : true
            })
            .then(response => {
                if (response.status === 200) {
                    swal.fire(
                        'Added!',
                        'Your todo has been added.',
                        'success'
                      )
                    this.showTodo();
                }
            });
    }

    render () {
        return (
            <div>
                <Formik
                initialValues={{
                    todo: ""
                }}
                onSubmit={values => {
                    this.addOne(values);
                  }}
                >
                    {({
                         values,
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         isSubmitting
                    }) => (
                    <form style={{textAlign:"center", marginTop:"50px"}} onSubmit={handleSubmit} autoComplete="off">
                        <TextField 
                            id="todo"
                            fullName="todo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.todo} 
                            label="Add Todo" 
                            variant="outlined" />
                        <Button style={{marginLeft:"20px"}} type="submit" variant="contained" color="primary">ADD</Button>
                    </form>
                    )}
                </Formik>
                {this.state.data.length > 0 && this.state.data.map(({name, todo, _id}, key) => {
                    return (
                        <Paper key={key} style={{width: "40%", margin:"0 auto", marginTop: "50px"}} classfullName={useStyles.root}>
                            <div style={{padding:"25px"}}>
                                <Typography variant="h5" component="h3">
                                    {name}
                                </Typography>
                                <Typography component="p">
                                    Todo - {todo}
                                </Typography>
                                <div style={{marginTop: "20px"}}>
                                    <Button variant="contained" color="primary" onClick={() =>this.updateOne(_id)}>
                                        Edit
                                    </Button>

                                    <Button style={{marginLeft:"20px"}} variant="contained" color="secondary" onClick={() =>this.deleteOne(_id, todo)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Paper>
                    )
                })}
            </div>
        );
    }
}