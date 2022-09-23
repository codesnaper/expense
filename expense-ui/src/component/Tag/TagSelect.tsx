import { Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, ListItemButton, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AlertContext, ServiceContext, UserContext } from "../../context";
import { useFormValidation } from "../../hooks/FormValidation";
import { ResponseList } from "../../modal/ResponseList";
import { Tag } from "../../modal/response/Tag";
import { ApiError, ErrorCode } from "../../modal/response/Error";
import { AlertType } from "../../modal/ExpenseAlert";
import { blue, red } from "@mui/material/colors";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface TagSelectProps {
    onChange?: (tags: Array<Tag>) => void;
    error: string | undefined;
}

export default function TagSelect(props: TagSelectProps) {
    const service = useContext(ServiceContext);
    const expenseAlert = useContext(AlertContext);
    const [tagName, setTagName] = useState<string[]>([]);
    const [tags, setTags] = useState<Array<Tag>>([]);
    const [openTagModel, setOpenTagModel] = useState<boolean>(false);
    const [isNameError, setIsNameError] = useState<boolean>(false);
    const [nameErrorText, setNameErrorText] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);
    const { handleSubmit, handleChange: handleTagFormChange, data: tagForm, errors: tagFormError } = useFormValidation<Tag>({
        validations: {
            name: {
                required: {
                    value: true,
                    message: "Tag Name is required"
                }
            },
            description: {
                required: {
                    value: true,
                    message: "Tag Description is required"
                },
                custom: {
                    isValid(value) {
                        return (value != null && value.length < 24);
                    },
                    message: "Max Description can be of 24 character and min character is 1."
                }
            }
        },
        onSubmit() {
            saveTag(tagForm);
        },
    });

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.stopPropagation();
        handleSubmit(event);
    }

    const saveTag = (tag: Tag) => {
        setLoader(true);
        service.tagService?.saveTag(tag)
            .then((response: Tag) => {
                tags.push(response);
                setTags([...tags]);
                handleTagModel();
            }).catch((err: ApiError) => {
                if (ErrorCode[err.errorCode] === ErrorCode.DUPLICATE_FIELD) {
                    setIsNameError(true);
                    setNameErrorText(err.message);
                } else {
                    expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                }
            }).finally(() => {
                setLoader(false);
            })
    }

    const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
        let selectedTags: Array<Tag> = [];
        const {
            target: { value },
        } = event;
        setTagName(
            typeof value === 'string' ? value.split(',') : value,
        );
        let inputTagNames: Array<string> = [];
        if (typeof value === 'string') {
            inputTagNames = [...value.split(',')];
        } else {
            inputTagNames = [...value]
        }
        selectedTags.forEach((tag: Tag, idx: number) => {
            if (inputTagNames.indexOf(tag.name) === -1) {
                selectedTags = [...selectedTags.splice(idx, 1)];
            } else {
                inputTagNames = [...inputTagNames.splice(inputTagNames.indexOf(tag.name), 1)]
            }
        });
        inputTagNames.forEach((inputTagName: string) => {
            selectedTags = [...selectedTags.concat(tags.filter((tag: Tag) => tag.name === inputTagName))];
        });
        sendTag(selectedTags);
    };

    const sendTag = (tags: Array<Tag>) => {
        props.onChange?.(tags);
    }

    const handleTagModel = () => {
        setOpenTagModel(!openTagModel);
    }

    useEffect(() => {
        service.tagService?.fetchAllTag()
            .then((res: ResponseList<Tag>) => {
                setTags(res.Items);
            })
    }, [service]);

    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }} >
                <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    error={props.error? true: false}
                    value={tagName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {tags.map((tag, index) => (
                        <MenuItem key={index} value={tag.name}>
                            <ListItemText primary={tag.name} secondary={tag.description}></ListItemText>
                        </MenuItem>
                    ))}
                    <MenuItem key='new Tag Button'>
                        <ListItemButton disableRipple={true}>
                            <Button onClick={handleTagModel} disableRipple={true} sx={{ width: '100%' }}>
                                <ListItemText primary="Create New Tag" />
                            </Button>
                        </ListItemButton>
                    </MenuItem>
                </Select>
                <FormHelperText sx={{color: red[700]}}>{props.error}</FormHelperText>
            </FormControl>

            <Dialog open={openTagModel} onClose={handleTagModel}>
                <Box id="tagForm" component="form" noValidate onSubmit={submitForm}>
                    <DialogTitle>Add Tag</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Tag Name"
                            type="email"
                            fullWidth
                            variant="standard"
                            error={tagFormError.name || isNameError ? true : false}
                            helperText={tagFormError.name ? tagFormError.name : "" + nameErrorText ? ". " + nameErrorText : ""}
                            onChange={handleTagFormChange('name')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            error={tagFormError.description ? true : false}
                            helperText={tagFormError.description}
                            onChange={handleTagFormChange('description')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={loader} onClick={handleTagModel}>Cancel</Button>
                        <Button type="submit" disabled={loader} form="tagForm">Add Tag</Button>
                        {loader &&
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: blue[200],
                                }}
                            />
                        }
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}