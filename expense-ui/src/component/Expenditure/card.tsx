import { DeleteForever, Preview } from "@mui/icons-material";
import { Button, Card, CardActionArea, CardContent, Chip, Divider, Typography } from "@mui/material";
import { green, grey, indigo, lime, red } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { Expenditure, ExpenditureType } from "../../modal/response/Expenditure";

interface ExpenditureCardProps{
    expenditure: Expenditure
}
export default function ExpenditureCard(props: ExpenditureCardProps) {

    const getColor = (expenditureType: ExpenditureType) => {
        switch(expenditureType){
            case ExpenditureType.EXPENSE: 
                return red[800];

            case ExpenditureType.REVENUE: 
                return green[800];

            case ExpenditureType.TRANSFER:
                return indigo[800];

            default:
                return grey[800];
        }
    }

    const getBGColor = (expenditureType: ExpenditureType) => {
        switch(expenditureType){
            case ExpenditureType.EXPENSE: 
                return red[200];

            case ExpenditureType.REVENUE: 
                return green[200];

            case ExpenditureType.TRANSFER:
                return indigo[200];

            default:
                return lime[200];
        }
    }

    return (
        <>
            <Card sx={{marginBottom: '12px',  background: `${getBGColor(props.expenditure.type)}`}}>
                <CardContent sx={{paddingBottom: '0px !important' ,}}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.expenditure.name}
                    </Typography>
                    <Divider/>
                    <Typography  sx={{color: `${getColor(props.expenditure.type)}`, marginBottom: '8px'}}>
                        {`${props.expenditure.type === ExpenditureType.EXPENSE? '-':''}${props.expenditure.amount} INR`}
                    </Typography>
                    {props.expenditure.category && <>
                        <Chip sx={{ mb: 1.5 }} label={props.expenditure.category.name}></Chip>
                    </>}
                    <CardActionArea>
                        <Stack direction='row'>
                        <Button variant="text" startIcon={<Preview/>} size="small"></Button>
                        <Button variant="text" startIcon={<DeleteForever/>} size="small"></Button>
                        </Stack>
                    </CardActionArea>
                </CardContent>
            </Card>
        </>
    );
}