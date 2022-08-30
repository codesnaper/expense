
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { useFormValidation } from '../../hooks/FormValidation';
import { Tag } from '../../modal/Tag';
import { TextField } from '@mui/material';

interface TagDialogFormProps {
    open: boolean;
    addNewTag?: (tag: Tag) => void;
}

export default function TagDailogForm(props: TagDialogFormProps) {

    const handleClose = () => {
        props.open = false;
    }

    const saveTag = (tag: Tag) => {
        props.addNewTag?.(tag);
    }

    const { handleChange, handleSubmit, data: tag, errors } = useFormValidation<Tag>({
        validations: {
            name: {
                required: {
                    value: true,
                    message: 'Tag Name is required.'
                }
            },
            description: {
                required: {
                    value: true,
                    message: 'Tag Description is '
                },
                custom: {
                    isValid(value) {
                        return value.length < 40;
                    },
                    message: 'Max character for Tag Description is 40 '
                }
            }
        },
        onSubmit: () => {
            alert(JSON.stringify(tag));
            props.open = !props.open;
            saveTag(tag);
        }
    });


    return (
        <>
            <Dialog disableEscapeKeyDown open={props.open} onClose={handleClose}>
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <DialogTitle>Create New Tag</DialogTitle>
                <DialogContent>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                id="tagName"
                                error={errors.name ? true : false}
                                helperText={errors.name}
                                label='Tag Name'
                                // label={localization.getString?.('Bank.modal.form.label.name', localization.getLanguage?.())}
                                variant="standard"
                                onChange={handleChange('name')}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                id="description"
                                error={errors.description ? true : false}
                                helperText={errors.description}
                                label='Tag Description'
                                // label={localization.getString?.('Bank.modal.form.label.name', localization.getLanguage?.())}
                                variant="standard"
                                onChange={handleChange('description')}
                            />
                        </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleClose}>Add New Tag</Button>
                </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}