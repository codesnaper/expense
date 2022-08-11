import { Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import useAlert from "../alert/alertHook";

export default function CategoryCard(props) {

    const [name, setName] = useState(props.name);
    const [editable, setEditable] = useState(props.editable);
    const [loader, setLoader] = useState(false);
    const { setAlert } = useAlert();
    const handleName = (event) => setName(event.target.value);

    const saveCard = () => {
        setLoader(true);
        const id = props.id
        const data = {
            name: name
        };
        if (!id) {
            data.userId = JSON.parse(sessionStorage.getItem('user')).username;
            fetch('http://localhost:3000/category/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    props.updateCategories(res);
                    setEditable(false);
                    setAlert(`${res.name} category has been added successfully.`, 'success');
                    setLoader(false);
                })
                .catch(err => {
                    setAlert(`Failed to add Category : ${data.name} !!!`, 'error');
                    console.error(err);
                    setLoader(false);
                })
        } else {
            fetch(`http://localhost:3000/category/${props.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'user-id': JSON.parse(sessionStorage.getItem('user')).username
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    res.ID = props.id;
                    props.updateCategories(res, true);
                    setEditable(false);
                    setAlert(`${res.name} category has been updated successfully.`, 'success');
                    setLoader(false);
                })
                .catch(err => {
                    setAlert(`Failed to update Category : ${data.name} !!!`, 'error');
                    console.error(err);
                    setLoader(false);
                })
        }
    }

    const editCard = () => setEditable(true);

    const deleteCard = () => {
        setLoader(true);
        fetch(`http://localhost:3000/category/${props.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'user-id': JSON.parse(sessionStorage.getItem('user')).username
            },
        })
            .then(res => res.json())
            .then(res => {
                props.deleteCategory(props.id);
                setAlert(`Category has been deleted successfully.`, 'success');
                setLoader(false);
            })
            .catch(err => {
                setAlert(`Failed to delete Category !!!`, 'error');
                console.error(err);
                setLoader(false);
            })

    }

    const cancel = () => {
        setEditable(false);
        props.updateCategories();
    }

    return (
        <>
            <Card sx={{ maxWidth: 275, margin: '24px' }}>
                <CardContent>
                    <Typography variant="h3" color="text.secondary" gutterBottom>
                        {editable ?
                            <>
                                <TextField id="filled-basic" onChange={handleName} defaultValue={props.name} label="Category Name" variant="filled" />
                            </>
                            :
                            props.children}

                    </Typography>
                </CardContent>
                {props.action &&
                    <CardActions>
                        {editable ?
                            <>
                                <Button disabled={loader} onClick={saveCard} size="small" >{loader && <CircularProgress size={16}
                                    sx={{
                                        color: grey[400],
                                    }} />} Save</Button>
                                <Button disabled={loader} onClick={cancel} size="small" >Cancel</Button>
                            </> :
                            <>
                                <Button disabled={loader} onClick={editCard} size="small" >{loader && <CircularProgress size={16}
                                    sx={{
                                        color: grey[400],
                                    }} />} Edit</Button>
                                <Button disabled={loader} size="small" onClick={deleteCard}>{loader && <CircularProgress size={16}
                                    sx={{
                                        color: grey[400],
                                    }} />} Delete</Button>
                            </>
                        }
                    </CardActions>
                }
            </Card>
        </>
    );

}