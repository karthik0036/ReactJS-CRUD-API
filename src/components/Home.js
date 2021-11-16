import React from 'react'
import { Link } from 'react-router-dom'

import {
    Typography, Box, makeStyles, Grid, TextField, Button, Tooltip, IconButton,
    Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer
} from "@material-ui/core"
import { deepPurple, green, orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from 'axios'
import { useState, useEffect } from 'react'

const useStyles = makeStyles({
    headingColor: {
        backgroundColor: deepPurple[400],
        color: "white"
    },

    addStuColor: {
        backgroundColor: green[400],
        color: "white"
    },
    StuListColor: {
        backgroundColor: orange[400],
        color: "white"
    },

    tableHeadCell: {
        color: "white",
        fontWeight: "bold",
        fontsize: 16
    },
})


export default function Home() {
    const classes = useStyles()

    const [students, setStudents] = useState([])

    useEffect(() => {
        async function getAllStudentData() {
            try {

                const students = await axios.get("http://localhost:3333/students")
                setStudents(students.data)

            } catch (error) {
                console.log("something wrong")
            }

        }
        getAllStudentData();
    }, [])

    const [studentt, setStudentt] = useState({
        stuname: "",
        email: ""
    })


    function onTextFieldChange(e) {
        setStudentt({
            ...studentt,
            [e.target.name]: e.target.value
        })


    }
    const [status, setStatus] = useState()

    async function onFormSubmit(e) {
        e.preventDefault()
        await axios.post("http://localhost:3333/students", studentt)
        setStatus(true)

    }
    if (status) {
        return <Home />
    }

    async function handleDelete(id) {
        await axios.delete(`http://localhost:3333/students/${id}`)

        let newStud = students.filter((item) => {
            return item.id !== id
        })
        setStudents(newStud);
    }


    return (
        <>
            <Box textAlign='center' className={classes.headingColor} p={1} mb={2}>
                <Typography variant='h3'>React CRUD operations with API</Typography>
            </Box>
            <Grid container justify-content="center" spacing={4}>
                <Grid item md={6} xs={12}>
                    <Box textAlign='center' className={classes.addStuColor} p={2} mb={2}>
                        <Typography variant='h5'>Add Student</Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField onChange={e => onTextFieldChange(e)} autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={e => onTextFieldChange(e)} autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" />
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)} >Add</Button>
                        </Box>
                    </form>
                </Grid>


                <Grid item md={6} xs={12}>
                    <Box textAlign='center' className={classes.StuListColor} p={2} >
                        <Typography variant='h5'>Students List</Typography>
                    </Box>
                    <TableContainer component={Paper} >
                        <Table >
                            <TableHead >
                                <TableRow style={{ backgroundColor: '#616161' }}>
                                    <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
                                    <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                                    <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                                    <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody >
                                {
                                    students.map((student, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell align="center">{i + 1}</TableCell>
                                                <TableCell align="center">{student.stuname}</TableCell>
                                                <TableCell align="center">{student.email}</TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="View">
                                                        <IconButton>
                                                            <Link to={`/view/${student.id}`}><VisibilityIcon color="primary" /></Link>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit">
                                                        <IconButton>
                                                            <Link to={`/edit/${student.id}`}><EditIcon /></Link>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton>
                                                            <DeleteIcon onClick={() => handleDelete(student.id)} color="secondary" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>

                                        )
                                    })
                                }



                            </TableBody>

                        </Table>
                    </TableContainer>




                </Grid>
            </Grid>
        </>


    )
}
