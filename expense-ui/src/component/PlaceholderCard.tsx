import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

export interface PlaceholderCardProps{
    children: React.ReactNode[],
    heading: string,
    info: string
}

export default function PlaceholderCard(props: PlaceholderCardProps) {
    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card sx={{ textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h1" component="div">
                            {props.children[0]}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {props.heading}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.info}
                        </Typography>
                    </CardContent>
                    {props.children[1]}
                </Card>
            </Grid>
        </Grid>
    </>)
}