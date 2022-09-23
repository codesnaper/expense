import { Button, capitalize, Divider, FormControl, Paper, Table, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";

export default function Profile() {

    return (
        <>
            <Box component={Container} maxWidth={'false'} height={'100vh'} sx={{ paddingTop: '40px' }} >

                <Paper elevation={6} sx={{ padding: '24px' }}>
                    <Typography variant="h5" letterSpacing={2} textTransform={'capitalize'} sx={{ marginBottom: '12px' }}>User Profile</Typography>
                    <Divider></Divider>
                    <FormControl margin="normal" fullWidth>
                        <Stack direction={'row'} spacing={2}>
                            <FormControl fullWidth>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                // onChange={handleChange('firstName')}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                // onChange={handleChange('firstName')}
                                />
                            </FormControl>
                        </Stack>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        // onChange={handleChange('firstName')}
                        />
                    </FormControl>

                    <Divider sx={{ marginBottom: '24px' }}></Divider>
                    <Stack direction={'row'} sx={{ display: 'flex', width: '100%' }}>
                        <Typography variant="h5" letterSpacing={2} textTransform={'capitalize'} sx={{ marginBottom: '12px' }}>Revenue</Typography>
                        <Button sx={{ marginLeft: 'auto' }} variant="outlined">Add Revenue</Button>
                    </Stack>
                    <Divider sx={{ margin: '12px' }}></Divider>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Account</TableCell>
                                <TableCell align="center">Recursive</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            </Box>
        </>
    )
}