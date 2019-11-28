import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Button from '@material-ui/core/Button';
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

    const {
        match: {
            params: {name}
        }
    } = props;

    const url = 'https://jsonplaceholder.typicode.com/posts?userId='+name

    const [data, setdata] = useState([]);
    const [error, setError] = useState('');
    const [id, setId] = useState(0);
    

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setdata(res.data);
            })
            .catch(err => {
                setError(err.message);
            })
    }, []);

    const onDelete = (idPost, key) => {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${idPost}`)
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(result => {
            if (result.value) {
              Swal.fire(
                "Deleted!",
                `Your post with id: ${idPost} is deleted.`,
                "success"
              )
            }
          })
        } else {
          Swal.fire("There is something wrong ", "error")
        }
      })
      .catch(error => {
        console.log(error)
      })
    };

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

    const onCreate = event => {

    }


    return (
        <div>
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
                    onClick={event => onEdit(event)}
                    variant="contained"
                    color="primary"
                    className={classes.button}>
                        Edit
                    </Button>
                    <Button
                    onClick={() => onDelete(item.id, key)}
                    variant="contained" 
                    color="secondary" 
                    className={classes.button}>
                        Delete
                    </Button>
                    {console.log(id)}
                    </p>
                );
            })} 
        </div>
    );
}

export default withRouter(NestedUser);

