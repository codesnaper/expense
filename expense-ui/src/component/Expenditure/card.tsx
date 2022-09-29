import { DeleteForever, Edit, Preview } from "@mui/icons-material";
import { Button, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { Expenditure } from "../../modal/response/Expenditure";

interface ExpenditureCardProps{
    expenditure: Expenditure
}
export default function ExpenditureCard(props: ExpenditureCardProps) {

    return (
        <>
            <Card sx={{marginBottom: '12px', background: `${props.expenditure.type === 'expense'? red['100']: green['100']}`}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.expenditure.name}
                    </Typography>
                    <Typography  sx={{color: `${props.expenditure.type === 'expense'? red[800]: green[800]}`, marginBottom: '8px'}}>
                        {`${props.expenditure.type === 'expense'? '-':''}${props.expenditure.amount} INR`}
                    </Typography>
                    <Chip sx={{ mb: 1.5 }} label={props.expenditure.category.name}></Chip>
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