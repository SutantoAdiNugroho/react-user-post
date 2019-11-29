import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { Formik, ErrorMessage } from "formik";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },

}));

export default class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount = () => {
        axios
        .get("http://localhost:5000/todos")
        .then(response => {
            const user = JSON.parse(localStorage.getItem("user"));
            

            this.setState({ data: response.data.data});
        })
        .catch(error => {
            console.log(error);
        });

    }

    render () {
        return (
            <div>
                <Formik
                initialValues={{
                    todo: ""
                }}
                onSubmit={(values, {setSubmitting}) => {
                    
                    const user = JSON.parse(localStorage.getItem("user"));
                    const fullName = user.firstName + " " + user.lastName
                    const email = user.email

                    axios
                    .post("http://localhost:5000/todos", {...values, fullName, email})
                    .then(response => {
                      if (response.status === 200) {
                        
                      }
                    })
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
                {this.state.data.length > 0 && this.state.data.map(({fullName, todo}, key) => {
                    return (
                        <Paper key={key} style={{width: "40%", margin:"0 auto", marginTop: "50px"}} classfullName={useStyles.root}>
                            <div style={{padding:"25px"}}>
                                <Typography variant="h5" component="h3">
                                    {fullName}
                                </Typography>
                                <Typography component="p">
                                    Todo - {todo}
                                </Typography>
                                <div style={{marginTop: "20px"}}>
                                    <Button variant="contained" color="primary">
                                        Edit
                                    </Button>

                                    <Button style={{marginLeft:"20px"}} variant="contained" color="secondary">
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