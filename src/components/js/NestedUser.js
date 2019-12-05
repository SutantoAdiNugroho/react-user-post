import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Swal from "sweetalert2"; 

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

const URL = "https://jsonplaceholder.typicode.com"

class NestedUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            posts: []
        };
    }

    componentDidMount = () => {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        this.setState({ id: id });

        axios
            .get(`${URL}/posts`)
            .then(response => {
                const filtered = response.data.filter(
                    item => item.userId === parseInt(id)
                );

                this.setState({ posts: filtered });
            })
            .catch(error => {
                console.log(error);
            });
    };

    deletePost = (postId, key) => {
        axios
            .delete(`${URL}/posts/${postId}`)
            .then(response => {
                if (response.status === 200) {
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
                                `Your post with id: ${postId} is deleted.`,
                                "success"
                            );

                            let rest = this.state.posts;

                            rest.splice(key, 1);

                            this.setState({
                                posts: rest
                            });
                        }
                    });
                } else {
                    Swal.fire("There is something wrong", "error");
                }
            })
            .catch(error => {
                Swal.fire("There is something wrong", "error");
                console.log(error);
            });
    };

    editPost = async (postId, index) => {
        Swal.mixin({
            input: "text",
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: ["1", "2"],
            inputValidator: value => {
                if (!value) {
                    return "You need to write something!";
                }
            }
        })
            .queue(["Edit Title", "Edit Body"])
            .then(result => {
                if (result.value) {
                    axios
                        .put(`${URL}/posts/${postId}`, {
                            title: result.value[0],
                            body: result.value[1]
                        })
                        .then(response => {
                            if (response.status === 200) {
                                Swal.fire({
                                    icon: "success",
                                    title: `Your post with id: ${postId} updated`,
                                    text: `title: ${response.data.title},  body: ${response.data.body}`
                                });
                            }

                            let rest = this.state.posts;

                            rest.splice(index, 1, {
                                title: result.value[0],
                                body: result.value[1]
                            });

                            this.setState({ posts: rest });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
    };

    addPost = () => {
        Swal.mixin({
            input: "text",
            confirmButtonText: "Next &rarr;",
            showCancelButton: true,
            progressSteps: ["1", "2"],
            inputValidator: value => {
                if (!value) {
                    return "You need to write something!";
                }
            }
        })
            .queue(["Add Title", "Add Body"])
            .then(result => {
                if (result.value) {
                    axios
                        .post(`${URL}/posts`, {
                            title: result.value[0],
                            body: result.value[1]
                        })
                        .then(response => {
                            if (response.status === 201) {
                                Swal.fire({
                                    icon: "success",
                                    title: `Your new post is successfully added`,
                                    text: `title: ${response.data.title},  body: ${response.data.body}`
                                });
                                let rest = this.state.posts;

                                rest.push({
                                    id: rest.length + 1,
                                    title: result.value[0],
                                    body: result.value[1]
                                });

                                this.setState({ posts: rest });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
    };

    render() {
        return (
            <div style={{marginTop:"15px"}}>
                <Button
                    onClick={() => {
                        this.addPost();
                    }}
                >
                    Add New Post
                </Button>
                {this.state.posts.length > 0 &&
                    this.state.posts.map((item, key) => {
                        return (
                          <p style={{marginTop:"15px"}}>
                          <Paper className={useStyles.root}>
                              <Typography key={key} variant="h5" component="h3">
                                  {item.title}
                              </Typography>
                              <Typography key={key} component="p">
                                  {item.body}
                              </Typography>
                          </Paper>
                          <div style={{marginTop:"15px"}}>
                            <Button
                            onClick={() => {this.editPost(item.id, key)}}
                            variant="contained"
                            color="primary"
                            className={useStyles.button}>
                                Edit
                            </Button>
                            <Button
                            style={{marginLeft:"10px"}}
                            onClick={() => {this.deletePost(item.id, key)}}
                            variant="contained" 
                            color="secondary" 
                            className={useStyles.button}>
                                Delete
                            </Button>
                          </div>
                          </p>
                        );
                    })}
            </div>
        );
    }
}
export default withRouter(NestedUser);
