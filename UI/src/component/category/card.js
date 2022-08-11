import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useState } from "react";

function stringToColor(string='Default category') {
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

    const [editable, setEditable] = useState(false);

    return (
        <>
            <Card sx={{ maxWidth: 275,margin: '24px', bgcolor: stringToColor(props.name) }}>
                <CardContent>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        {props.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Edit</Button>
                    <Button size="small">Delete</Button>
                </CardActions>
            </Card>
        </>
    );

}