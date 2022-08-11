import { useEffect, useState } from "react";
import CategoryCard from "./card";
import AddIcon from '@mui/icons-material/Add';
import { AppBar, Button, Fab, Toolbar, Typography, Paper, Grid } from "@mui/material";
export default function Category(props) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/category', {
            headers: {
                'user-id': JSON.parse(sessionStorage.getItem('user')).username
            }
        }).then(res => res.json())
            .then(res => {
                setCategories(res.Items)
            }).catch(err => console.error(err));
    }, []);


    const addCard = () => {
        setCategories([...categories, { editable: true, name: '' }])
    }

    const updateCategoriesCallback = (category) => {
        setCategories([...categories.filter(category => !category.editable), category])
    }

    return (<>
        <Paper elevation={3} >
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="body"
                    id="tableTitle"
                    component="div"
                >
                    Categories
                </Typography>
                <Typography
                    sx={{ flex: 'none' }}
                    variant="body"
                    id="tableTitle"
                    component="div"
                >
                    <Button variant="outlined" onClick={addCard}><AddIcon sx={{ mr: 1 }} />
                        Add Catrgory</Button>
                </Typography>
            </Toolbar>
            <Grid container spacing={2}>
                {categories && categories.map((category, index) =>
                    <Grid item>
                            <CategoryCard updateCategories={updateCategoriesCallback} key={index} name={category.name} editable={category.editable} action id={category.ID}>
                                <span>{category.name}</span>
                            </CategoryCard>
                    </Grid>
                )}
            </Grid>
        </Paper>

    </>)
}