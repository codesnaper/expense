import { useTheme } from "@emotion/react";
import { Button, Chip, FormControl, InputLabel, ListItemButton, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { Box, Theme } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { ServiceContext, UserContext } from "../../context";
import { ResponseList } from "../../modal/ResponseList";
import { Tag } from "../../modal/Tag";
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


export default function TagSelect() {
    const user = useContext(UserContext);
    const service = useContext(ServiceContext);
    const theme = useTheme();
    const [tagName, setTagName] = useState<string[]>([]);
    const [tags, setTags] = useState<Array<Tag>>([]);
    const [openTagModel, setOpenTagModel] = useState<boolean>(false);

    const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
        const {
            target: { value },
        } = event;
        setTagName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleTagModel = () => {
        setOpenTagModel(true);
    }

    useEffect(() => {
        service.tagService?.fetchAllTag(user.id)
            .then((res: ResponseList<Tag>) => {
                setTags(res.Items);
            })
    }, [service]);

    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
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
                            <Button onClick={handleTagModel} disableRipple={true} sx={{width: '100%'}}>
                            <ListItemText primary="Create New Tag" />
                            </Button>
                        </ListItemButton>
                    </MenuItem>
                </Select>
            </FormControl>
        </>
    );
}