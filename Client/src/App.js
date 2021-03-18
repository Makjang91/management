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
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
    'id': 1,
    'image': 'http://placeimg.com/64/64/1',
    'name': 'jim',
    'gender': 'M',
    'birthday': '870923',
    'job': 'Salesman'
  },
  {
    'id': 2,
    'image': 'http://placeimg.com/64/64/2',
    'name': 'Jully',
    'gender': 'F',
    'birthday': '950215',
    'job': 'Teacher'
  },
  {
    'id': 3,
    'image': 'http://placeimg.com/64/64/3',
    'name': 'Max',
    'gender': 'M',
    'birthday': '001101',
    'job': 'Student'
  }
]

class App extends Component {
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
                    customers.map(c => {
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
                    })
                  }
                </TableBody>
              </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
