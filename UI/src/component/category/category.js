import { useEffect, useState } from "react";
import CategoryCard from "./card";
import AddIcon from '@mui/icons-material/Add';
import { Button, Toolbar, Typography, Paper, Grid, Skeleton, Card, CardHeader, CardActionArea, CardContent, Container } from "@mui/material";
import useAlert from "../alert/alertHook";
import CategoryIcon from '@mui/icons-material/Category';
import ContentLoader from "../../blocks/contentLoader";
export default function Category(props) {

    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState(true);
    const { setAlert } = useAlert();

    useEffect(() => {
        fetch('http://localhost:3000/category', {
            headers: {
                'user-id': JSON.parse(sessionStorage.getItem('user')).username
            }
        }).then(res => res.json())
            .then(res => {
                setCategories(res.Items)
                setLoader(false);
            }).catch(err => {
                setLoader(false);
                console.error(err);
                setAlert('Failed in fetching Categories', 'error');
            });
    }, []);


    const addCard = () => {
        setCategories([...categories, { editable: true, name: '' }])
    }

    const updateCategoriesCallback = (category, update) => {
        if (update) {
            setCategories([...categories.map(cData => {
                if (cData.ID === category.ID) {
                    return category;
                }
                return cData;
            })]);
        } else {
            if (category) {
                setCategories([...categories.filter(category => !category.editable), category])
            } else {
                setCategories([...categories.filter(category => !category.editable)])
            }
        }
    }

    const deleteCategoryCallback = (id) => {
        setCategories([...categories.filter(category => category.ID !== id)]);
    }

    return (<>
        {loader ? <>
            <ContentLoader heading={'Fetching Categories Details !!!'}>
            </ContentLoader>
        </> : <>
            <Container maxWidth sx={{ 'margin-top': '40px' }}>
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
                            <CategoryIcon sx={{ verticalAlign: 'bottom' }}></CategoryIcon>
                            Categories
                        </Typography>
                        <Typography
                            sx={{ flex: 'none' }}
                            variant="body"
                            id="tableTitle"
                            component="div"
                        >
                            <Button disabled={loader} variant="outlined" onClick={addCard}><AddIcon sx={{ mr: 1 }} />
                                Add Category</Button>
                        </Typography>
                    </Toolbar>
                    <Grid container spacing={2}>
                        {loader ?
                            <>
                                <Skeleton sx={{ margin: '24px' }} variant="rectangular" width={339} height={151} />
                                <Skeleton sx={{ margin: '24px' }} variant="rectangular" width={339} height={151} />
                                <Skeleton sx={{ margin: '24px' }} variant="rectangular" width={339} height={151} />
                            </>
                            :
                            <>
                                {categories && categories.map((category, index) =>
                                    <Grid item key={index}>
                                        <CategoryCard
                                            updateCategories={updateCategoriesCallback}
                                            deleteCategory={deleteCategoryCallback}
                                            key={index}
                                            name={category.name}
                                            editable={category.editable}
                                            action
                                            id={category.ID}>
                                            <span>{category.name}</span>
                                        </CategoryCard>
                                    </Grid>
                                )}
                                {!categories || (categories && categories.length === 0) &&
                                    <Grid item xs={12}>
                                        <Card sx={{ textAlign: 'center' }}>
                                            <CardContent>
                                                <Typography variant="h1" component="div">
                                                    <CategoryIcon fontSize="30"></CategoryIcon>
                                                </Typography>
                                                <Typography variant="h5" component="div">
                                                    Categories are not been created yet.
                                                </Typography>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    It will help to keep the expense in category group and will be able to help to apply limit to expense per category. Click on Add button below to add new category.
                                                </Typography>
                                            </CardContent>
                                            <CardActionArea>
                                                <Button size="large" onClick={addCard}><AddIcon sx={{ mr: 1 }} />
                                                    Add Category
                                                </Button>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                }
                            </>
                        }

                    </Grid>
                </Paper>
            </Container>
        </>}

    </>)
}