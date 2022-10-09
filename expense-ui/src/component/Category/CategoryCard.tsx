import { Button, Card, CardActionArea, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { AlertContext, ServiceContext } from "../../context";
import { useFormValidation } from "../../hooks/FormValidation";
import { AlertType } from "../../modal/ExpenseAlert";
import { OperationType } from "../../modal/OperationType";
import { Category } from "../../modal/response/Category";
import { ApiError, ErrorCode } from "../../modal/response/Error";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface CategoryCardProps {
    categoryId: number;
    name?: string;
    description?: string;
    onEvent: (card: Category, operation: OperationType) => void;
    editable: boolean
}
export default function CategoryCard(props: CategoryCardProps) {

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

    const [isEditable, setEditable] = useState<boolean>(props.editable);

    const [errorText, setErrorText] = useState<string | undefined>(undefined);

    const [loader, setLoader] = useState<boolean>(false);

    const { handleSubmit, handleChange, data: categoryData, errors: formError, refreshError } = useFormValidation<Category>({
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
            setLoader(true);
            if (props.categoryId === -1) {
                service.categoryService?.addCategory(categoryData)
                    .then((res: Category) => {
                        props.onEvent(res, OperationType.ADD);
                        categoryData.name = '';
                        categoryData.description = '';
                        refreshError();
                        expenseAlert.setAlert?.('Category Addedd Successfully', AlertType.SUCCESS);
                        
                    })
                    .catch((err: ApiError) => {
                        if (ErrorCode[err.errorCode] === ErrorCode.DUPLICATE_FIELD) {
                            setErrorText(err.message);
                        } else {
                            expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                        }
                    })
                    .finally(() => {
                        setLoader(false);
                    });
            } else {
                service.categoryService?.updateCategory(categoryData)
                    .then((res: Category) => {
                        props.onEvent(res, OperationType.EDIT);
                        expenseAlert.setAlert?.('Category Updated Successfully', AlertType.SUCCESS);
                        setEditable(false);
                    })
                    .catch((err: ApiError) => {
                        if (ErrorCode[err.errorCode] === ErrorCode.DUPLICATE_FIELD) {
                            setErrorText(err.message);
                        } else {
                            expenseAlert.setAlert?.(err.message, AlertType.ERROR);
                        }
                    })
                    .finally(() => {
                        setLoader(false);
                    });
                props.onEvent(categoryData, OperationType.EDIT);
            }
        }
    });

    const deleteCategory = () => {
        setLoader(true);
        service.categoryService?.deleteCategory(categoryData.id)
            .then(() => {
                props.onEvent(categoryData, OperationType.DELETE);
                expenseAlert.setAlert?.('Category Deleted Successfully', AlertType.SUCCESS);
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    return (
        <>
            <Box id={`${props.categoryId}-categoryForm`} component="form" noValidate onSubmit={handleSubmit}>
                <Card key={props.categoryId} >
                    <CardContent>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ marginBottom: '12px' }}>
                            <TextField
                                fullWidth={true}
                                required
                                id="categoryName"
                                error={formError.name || errorText ? true : false}
                                helperText={formError.name ? formError.name : "" + errorText ? errorText : ""}
                                defaultValue={categoryData.name}
                                disabled={!isEditable}
                                label='Name'
                                variant="outlined"
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
                                variant="outlined"
                                multiline
                                rows={3}
                                onChange={handleChange('description')}
                                disabled={!isEditable}
                            />
                        </Typography>
                    </CardContent>
                    <CardActionArea sx={{ margin: '12px' }}>
                        {isEditable && <>
                            <Button
                                type="submit"
                                sx={{ marginRight: '12px' }}
                                disabled={loader}
                                variant="contained"
                                form={`${props.categoryId}-categoryForm`}
                                size="small"
                                startIcon={props.categoryId === -1 ? <AddIcon/> : <EditIcon/>}
                            >
                                {loader && <>
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: blue[200],
                                        }}
                                    />
                                </>}
                                {props.categoryId === -1 ? 'Add' : 'Update'} Category
                            </Button>
                        </>}
                        {!isEditable && <>
                            <Button color={"info"} startIcon={<EditIcon/>} size="small" variant="contained" sx={{ marginRight: '12px' }} onClick={() => setEditable(true)}>
                                Edit Category
                            </Button>
                        </>}
                        {props.categoryId !== -1 && <>
                            <Button size="small" color={"error"} startIcon={<DeleteOutlineIcon/>} disabled={loader} variant="contained" onClick={deleteCategory}>
                                {loader && <>
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: blue[200],
                                        }}
                                    />
                                </>}
                                Delete
                            </Button>
                        </>}
                    </CardActionArea>
                </Card>
            </Box>
        </>
    );

}