import { Stack } from "@mui/system";
import AdbIcon from '@mui/icons-material/Adb';
import { Chip, Typography } from "@mui/material";
import { Configuration } from "../../../config/Configuration";

export default function DrawerHeaderLogo(){

    return(
        <>
            <Stack direction="row" spacing={1} alignItems="center" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: '12px'
            }}>
                <AdbIcon fontSize="large" />
                <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        EXPENSE-MANAGEMENT
                    </Typography>
                <Chip
                    label={`Version - ${Configuration.version}`}
                    size="small"
                    sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                    component="a"
                    href={Configuration.github}
                    target="_blank"
                    clickable
                />
            </Stack>
        </>
    )
    
}