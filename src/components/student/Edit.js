import React from 'react'
import {
    Typography, Box, makeStyles, Grid, TextField, Button, Tooltip, IconButton,
    Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer
} from "@material-ui/core"
import { deepPurple, green, orange } from '@material-ui/core/colors';

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
    headingColor: {
        backgroundColor: deepPurple[400],
        color: "white"
    },

    addStuColor: {
        backgroundColor: green[400],
        color: "white"
    },
})


export default function Edit() {
    const classes = useStyles()
    const navigate = useNavigate()
    const { id } = useParams()

    const [student, setStudent] = useState({
        stuname: "",
        email: ""
    })

    useEffect(() => {
        async function getstudent() {
            const student = await axios.get(`http://localhost:3333/students/${id}`)
            setStudent(student.data)
        }
        getstudent()
    }, [id])

    function onTextFieldChange(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
        console.log(student);


    }

    async function onFormSubmit(e) {
        e.preventDefault()
        await axios.put(`http://localhost:3333/students/${id}`, student)
        navigate('/')
    }



    function handleClick() {
        navigate('/')
    }
    return (
        <>
            <Box textAlign='center' className={classes.headingColor} p={1} mb={2}>
                <Typography variant='h3'>React CRUD operations with API</Typography>
            </Box>
            <Grid container justify="center" spacing={4}>
                <Grid item md={6} xs={12}>
                    <Box textAlign='center' className={classes.addStuColor} p={2} mb={2}>
                        <Typography variant='h5'>Edit Student</Typography>
                    </Box>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label=" id" autoFocus value={student.id} disabled />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField onChange={e => onTextFieldChange(e)} autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" value={student.stuname} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={e => onTextFieldChange(e)} autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={student.email} />
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button onClick={e => onFormSubmit(e)} type="submit" variant="contained" color="primary" fullWidth >Update</Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
            <Box textAlign="center" m={3}>
                <Button onClick={handleClick} type="submit" variant="contained" color="primary" >Back to Home</Button>
            </Box>
        </>
    )
}
