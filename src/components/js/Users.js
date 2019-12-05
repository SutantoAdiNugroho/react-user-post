import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default class Users extends Component {

    constructor (props) {
        super (props)

        this.state={
            data:[]
        }
    }

    componentDidMount = () => {
        axios
            .get(`${process.env.REACT_APP_API_PLACEHOLDER}/users`)
            .then(response => {
                this.setState({data : response.data});
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
            <p>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
            {this.state.data.length > 0 && this.state.data.map((item, key) => {
          return (
            <div style={{margin:"10px"}}>
            <Card className={useStyles.card}>
            <CardContent>
              <Typography key={key} className={useStyles.title} color="textSecondary" gutterBottom>
                Cards
              </Typography>
              <form>
              <Typography key={key} variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography key={key} className={useStyles.pos} color="textSecondary">
                {item.email}
              </Typography>
              <Typography key={key} variant="body2" component="p">
                {item.address.street}, {item.address.suite}, {item.address.city}
                <br />
                {item.address.zipcode}
              </Typography>
              <CardActions key={key}>
              <Link key={key} to={`/Users/${item.id}`}>Learn More</Link>
            </CardActions>
              </form>
            </CardContent>
          </Card>
          </div>
        )
        })}
          </div>
            </p>
        )
    }
}

{/* <Link to={`/Users/${name}`}>Ini adalah halaman user</Link> */}

