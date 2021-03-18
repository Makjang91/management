import './App.css';
import { Component } from 'react';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

class App extends Component {

  state = {
    customers: ""
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render(){ 
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Num</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Job</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.state.customers ? this.state.customers[0].map(c => {
                      return (
                        <Customer
                          key={c.id}
                          id={c.id}
                          image={c.image}
                          name={c.name}
                          gender={c.gender}
                          birthday={c.birthday}
                          job={c.job}
                        />
                      )
                    }) : "loading"
                  }
                </TableBody>
              </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
