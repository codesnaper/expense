import { Backdrop, Card, CardContent, CircularProgress, Grid, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface ContentLoaderProps{
    heading: string;
    children: React.ReactNode
}

export default function ContentLoader(props: ContentLoaderProps) {

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