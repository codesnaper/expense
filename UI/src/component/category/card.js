import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";

function stringToColor(string = 'Default category') {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
}

export default function CategoryCard(props) {

    const [name, setName] = useState(props.name);

    const [editable, setEditable] = useState(props.editable);

    const handleName = (event) => setName(event.target.value);

    const saveCard = () => {
        const data = {
            name: name,
            userId: JSON.parse(sessionStorage.getItem('user')).username
        };
        fetch('http://localhost:3000/category/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res=> {
                props.updateCategories(res);
                setEditable(false);
            })
    }

    const editCard = () => setEditable(true);

    const deleteCard = () => {

    }

    const cancel = () => setEditable(false);

    return (
        <>
            <Card sx={{ maxWidth: 275, margin: '24px' }}>
                <CardContent>
                    <Typography variant="h3" color="text.secondary" gutterBottom>
                        {editable ?
                            <>
                                <TextField id="filled-basic" onChange={handleName} defaultValue={name} label="Filled" variant="filled" />
                            </>
                            :
                            props.children}

                    </Typography>
                </CardContent>
                {props.action &&
                    <CardActions>
                        {editable ?
                            <>
                                <Button onClick={saveCard} size="small" >Save</Button>
                                <Button onClick={cancel} size="small" >Cancel</Button>
                            </> :
                            <>
                                <Button onClick={editCard} size="small" >Edit</Button>
                            </>
                        }

                        <Button size="small">Delete</Button>
                    </CardActions>
                }
            </Card>
        </>
    );

}