import { Backdrop, CircularProgress } from "@mui/material"

const Loader = (props) => {
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit"  sx={{marginRight: '2rem'}}/> 
                <h4>{`  Loading Application !!!!`}</h4>
            </Backdrop>
        </>
    )
}


export default Loader