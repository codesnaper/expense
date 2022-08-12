import { Backdrop, Card, CardContent, CircularProgress, Grid, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function ContentLoader(props) {

    return (<>
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" sx={{marginRight: '2rem'}}/>
                <h4>{props.heading}</h4>
            </Backdrop>
        </>
    </>);
}