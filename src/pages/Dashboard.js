import * as React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const originalRows = [
    { firstName: "Anshuman", lastName: 'Talukdar', email: "anshumantalukdar02@gmail.com", fav: false },
    { firstName: "Rajnandini", lastName: 'Sarmah', email: "rajnandini@gmail.com", fav: true },
    { firstName: "Shirley", lastName: 'Fedelmid', email: "shirley@gmail.com", fav: false },
    { firstName: "Leigh", lastName: 'Maurie', email: "maurie@gmail.com", fav: true },
    { firstName: "Shea", lastName: 'Chea', email: "shea@gmail.com", fav: false },
    { firstName: "Hayden", lastName: 'Safa', email: "safa@gmail.com", fav: false },
];
export default function Dashbourd() {
    const [rows, setRows] = React.useState(originalRows);
    const [editValues, setEditValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [newContactValues, setNewContactValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [editModal, setEditModal] = React.useState(false);
    const [newContactModal, setNewContactModal] = React.useState(false);

    const handleChange = name => event => {
        setEditValues({ ...editValues, [name]: event.target.value });
    };

    const handlenewContactChange = name => event => {
        setNewContactValues({ ...newContactValues, [name]: event.target.value });
    };

    const handleEditModalClose = event => {
        setEditModal(false)
    };
    const handleAddNewModalClose = event => {
        setNewContactModal(false)
    };

    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
            return row.email.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const addFavorite = (e) => {
        if (e.fav) return null
        const favAddedRows = rows.map((row) => {
            if (e.email === row.email) {
                return ({ ...row, fav: true })
            } else {
                return row
            }
        });
        setRows(favAddedRows);
    }

    const removeFavorite = (e) => {
        if (!e.fav) return null
        const favRemoveRows = rows.map((row) => {
            if (e.email === row.email) {
                return ({ ...row, fav: false })
            } else {
                return row
            }
        });
        setRows(favRemoveRows);
    }

    const deleteContact = (e) => {
        const deleteContactRows = [...rows]
        for (var i = 0; i < deleteContactRows.length; i++) {
            if (e.email === deleteContactRows[i].email) {
                deleteContactRows.splice(i, 1);
            }
        }
        setRows(deleteContactRows);
    }

    const editContact = (e, i) => {
        setEditValues({ ...e, index: i });
        setEditModal(true)
    }
    const addNewContactBtn = () => {
        setNewContactModal(true)
    }

    const editSave = () => {
        const deleteContactRows = [...rows]
        const { index, ...values } = editValues
        deleteContactRows[editValues.index] = values
        console.log(deleteContactRows)
        setRows(deleteContactRows);
        setEditModal(false)
    }
    const addNewContact = () => {
        const addNewContactRows = [...rows]
        addNewContactRows.push(newContactValues)
        setRows(addNewContactRows);
        setNewContactModal(false)
        setNewContactValues({
            firstName: '',
            lastName: '',
            email: '',
        })
    }
    return (
        <Box sx={{ background: "whitesmoke", minHeight: "100vh" }} width={"100%"} paddedTop={"5rem"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <Typography variant='h6'>
                Contact Management
            </Typography>
            <Button sx={{ margin: "1rem" }} variant='contained' onClick={addNewContactBtn}>
                Add New Contact
            </Button>
            <Box display={"flex"} gap={"3rem"} marginTop={"3rem"}>
                <Box>
                    <Typography variant='body1' marginBottom={"0.5rem"}>
                        Search Email ID
                    </Typography>
                    <TextField
                        fullWidth
                        onChange={(e) => requestSearch(e.target.value)}
                        size='small'
                        sx={{ backgroundColor: "white" }}
                    />
                    <Typography variant='body1' margin={"1rem 0 0.5rem"}>
                        Contact Directory
                    </Typography>
                    <Paper variant="outlined" display={"flex"} flexDirection={"column"} gap={"1rem"} padding={"1rem"}>
                        {rows.map((e, i) => (
                            <Box width={"400px"} key={e.email} display={"flex"} alignItems={"center"} gap={"1rem"} padding={"0.5rem 1rem"}>
                                <Box display={"flex"} flexDirection={"column"}>
                                    <IconButton onClick={() => editContact(e, i)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteContact(e)}>
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                                <Box flex={1}>
                                    <Typography variant='h6' component={"p"}>{e.firstName}</Typography>
                                    <Typography variant='body1' component={"p"}>{e.email}</Typography>
                                </Box>
                                <IconButton onClick={() => addFavorite(e)}>
                                    <StarRoundedIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </Paper>
                </Box >
                <Box>
                    <Typography variant='body1' marginBottom={"0.5rem"}>
                        Favorite
                    </Typography>
                    <Paper variant="outlined" display={"flex"} flexDirection={"column"} gap={"1rem"} padding={"1rem"}>
                        {rows.map(e => {
                            if (e.fav) return (
                                <Box width={"400px"} key={e.email} display={"flex"} alignItems={"center"} gap={"1rem"} padding={"0.5rem 1rem"}>
                                    <Box flex={1}>
                                        <Typography variant='h6' component={"p"}>{e.firstName}</Typography>
                                        <Typography variant='body1' component={"p"}>{e.email}</Typography>
                                    </Box>
                                    <IconButton onClick={() => removeFavorite(e)}>
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                            )
                        })}
                    </Paper>
                </Box>
            </Box >
            <Dialog
                open={editModal}
                onClose={handleEditModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit Contact
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="First Name"
                        value={editValues.firstName}
                        onChange={handleChange('firstName')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        value={editValues.lastName}
                        onChange={handleChange('lastName')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={editValues.email}
                        onChange={handleChange('email')}
                        margin="normal"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={editSave} type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={newContactModal}
                onClose={handleAddNewModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Add New Contact
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="First Name"
                        value={newContactValues.firstName}
                        onChange={handlenewContactChange('firstName')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        value={newContactValues.lastName}
                        onChange={handlenewContactChange('lastName')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={newContactValues.email}
                        onChange={handlenewContactChange('email')}
                        margin="normal"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={addNewContact} type="submit" variant="contained" color="primary">
                        Add new
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>

    );
}