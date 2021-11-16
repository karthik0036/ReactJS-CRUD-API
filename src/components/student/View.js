import React from 'react'
import {
    Typography, Box, makeStyles, Button,
    Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer
} from "@material-ui/core"
import { orange } from '@material-ui/core/colors';


import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const useStyles = makeStyles({
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


export default function View() {
    const classes = useStyles()
    const { id } = useParams()
    const navigate = useNavigate()

    const [studsid, setStudsid] = useState([])

    useEffect(() => {
        async function getStudsid() {
            const stuid = await axios.get(`http://localhost:3333/students/${id}`)
            setStudsid(stuid.data)
        }
        getStudsid()
    }, [id])


    function handleClick() {
        navigate('/')
    }
    return (
        <div>
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

                        </TableRow>
                    </TableHead>

                    <TableBody >
                        <TableRow>
                            <TableCell align="center">{studsid.id}</TableCell>
                            <TableCell align="center">{studsid.stuname}</TableCell>
                            <TableCell align="center">{studsid.email}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box textAlign="center" m={3}>
                <Button onClick={handleClick} type="submit" variant="contained" color="primary" >Back to Home</Button>
            </Box>




        </div>
    )
}
