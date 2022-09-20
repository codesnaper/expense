import { AddCircleOutline, ModeEdit } from "@mui/icons-material";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Paper, PaperProps, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { FormEvent, useState } from "react";
import Draggable from "react-draggable";
import { OperationType } from "../../modal/OperationType";
import Close from "@mui/icons-material/Close";
import { Stack } from "@mui/system";

function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

interface AccountModelProps {
    title: string
    show: boolean;
    operationType: OperationType;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    loader?: boolean;
    children: React.ReactNode,
    onClose: () => void;
}
export default function AccountModal(props: AccountModelProps) {

    return (
        <>
            <Dialog PaperComponent={PaperComponent} open={props.show} aria-labelledby="draggable-dialog-title" onClose={props.onClose}>
                <Box id="bankForm" component="form" noValidate onSubmit={props.onSubmit}>
                    <DialogTitle className="grabbable"
                        id="account-dialog-title">
                        <Stack direction={"row"} sx={{display: 'flex'}}>
                            <Typography variant="h5" letterSpacing={2}>
                                {props.operationType === OperationType.ADD ? 'Add ' : 'Edit '} {props.title}
                            </Typography>
                            <Button sx={{marginLeft: 'auto'}} variant="text" onClick={props.onClose}>
                            <Close />
                            </Button>
                        </Stack>
                    </DialogTitle>
                    <DialogContent sx={{ maxHeight: '50vh' }}>
                        {props.children}
                    </DialogContent>
                    <DialogActions sx={{marginBottom: '24px' , marginRight: '12px'}}>
                        <Button variant="contained" startIcon={props.operationType === OperationType.ADD ? <AddCircleOutline /> : <ModeEdit />} type="submit" form="bankForm" disabled={props.loader}>{props.operationType === OperationType.ADD ?
                            `Add ${props.title}`
                            :
                            `Edit ${props.title}`
                        }
                        </Button>
                        {props.loader && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: blue[200],
                                }}
                            />
                        )}
                        <Button variant="contained" startIcon={<Close />} onClick={props.onClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}