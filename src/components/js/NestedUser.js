import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
  }),
);

function NestedUser(props) {

    const classes = useStyles();
    // const showAlert = useAllert;

    const {
        match: {
            params: {name}
        }
    } = props;

    const url = 'https://jsonplaceholder.typicode.com/posts?userId='+name

    const [data, setdata] = useState([]);
    const [error, setError] = useState('');
    

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setdata(res.data);
            })
            .catch(err => {
                setError(err.message);
            })
    }, []);

    const onAlert = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              return fetch(process.env.REACT_APP_API_POST+id, {
                method: 'delete'
              })
              .then(response => response.json());
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }

    const onEdit = event => {
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
          }).queue([
            {
              title: 'Edit On Title',
            },
            'Edit On Body',
          ]).then((result) => {
            if (result.value) {
              const answers = JSON.stringify(result.value)
              Swal.fire({
                title: 'All done!',
                html: `
                  Your answers:
                  <pre><code>${answers}</code></pre>
                `,
                confirmButtonText: 'Oke'
              })
            }
          })
    }


    return (
        <div>
            {console.log(data.length)}
            {data.length > 0 && data.map((item, key) => {
                const idPost = item.id
                return (
                    <p>
                    <Paper className={classes.root}>
                        <Typography key={key} variant="h5" component="h3">
                            {item.title}
                            {item.id}
                        </Typography>
                        <Typography key={key} component="p">
                            {item.body}
                        </Typography>
                    </Paper> 
                    <Button
                    onClick={event => onEdit(item)}
                    variant="contained"
                    color="primary"
                    className={classes.button}>
                        Edit
                    </Button>
                    <Button
                    onClick={event => onAlert(item.id, item.title)}
                    variant="contained" 
                    color="secondary" 
                    className={classes.button}>
                        Delete
                    </Button>
                    
                    </p>
                );
            })} 
        </div>
    );
}

export default withRouter(NestedUser);

