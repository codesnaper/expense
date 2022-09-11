import { Button, Card, CardActionArea, CardContent, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useFormValidation } from "../../hooks/FormValidation";
import { OperationType } from "../../modal/OperationType";
import { Category } from "../../modal/response/Category";

interface CategoryCardProps {
    categoryId: number;
    name?: string;
    description?: string;
    onEvent: (card: Category, operation: OperationType) => void;
    editable: boolean
}
export default function CategoryCard(props: CategoryCardProps) {

    const [isEditable, setEditable] = useState<boolean>(props.editable);

    const { handleSubmit, handleChange, data: categoryData, errors: formError } = useFormValidation<Category>({
        validations: {
            name: {
                required: {
                    message: 'Category Name is required',
                    value: true
                }
            }
        },
        initialValues: {
            name: props.name,
            id: props.categoryId,
            description: props.description
        },
        onSubmit: () => {
            if(props.categoryId === -1){
                props.onEvent(categoryData, OperationType.ADD);
            } else {
                props.onEvent(categoryData, OperationType.EDIT);
            }
        }
    });

    const deleteCategory = () => {
        props.onEvent(categoryData, OperationType.DELETE);
    }

    return (
        <>
            <Box id="categoryForm" component="form" noValidate onSubmit={handleSubmit}>
                <Card key={props.categoryId} >
                    <CardContent>
                        <Typography variant="subtitle1" color="text.secondary" sx={{marginBottom: '12px'}}>
                            <TextField
                                fullWidth={true}
                                required
                                id="categoryName"
                                error={formError.name ? true : false}
                                helperText={formError.name}
                                defaultValue={categoryData.name}
                                disabled={!isEditable}
                                label='Name'
                                variant="standard"
                                onChange={handleChange('name')}
                            />
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            <TextField
                                fullWidth={true}
                                required
                                id="categoryDescription"
                                error={formError.description ? true : false}
                                helperText={formError.description}
                                defaultValue={categoryData.description}
                                label='Description'
                                variant="standard"
                                multiline
                                rows={3}
                                onChange={handleChange('description')}
                                disabled={!isEditable}
                            />
                        </Typography>
                    </CardContent>
                    <CardActionArea sx={{margin: '12px'}}>
                        {isEditable && <>
                            <Button type="submit" variant="contained" form="categoryForm" size="small" >Save Category</Button>
                        </>}
                        {!isEditable && <>
                            <Button size="small" variant="contained" onClick={() => setEditable(true)}>Edit</Button>
                        </>}
                        {props.categoryId !== -1 && <>
                            <Button size="small" variant="contained" onClick={deleteCategory}>Delete</Button>
                        </>}
                    </CardActionArea>
                </Card>
            </Box>
        </>
    );

}