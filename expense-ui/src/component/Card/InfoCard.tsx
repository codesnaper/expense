import { Card, CardContent, Grid, Typography } from "@mui/material";

interface InfoCardProps {
    header: string,
    value: string,
    suffixCurrency?: string,
    secondaryText?: string,
    color?: string
}

export default function InfoCardComponent(props: InfoCardProps) {

    return (
        <>
            <Grid item lg={3} md={6} xs={6}>
                <Card raised>
                    <CardContent sx={{padding: '12px'}}>
                        <Typography color="text.secondary" gutterBottom>
                            {props.header}
                        </Typography>
                        <Typography variant="h4" component="div" color={props.color}>
                            <span>{`${props.value} ${props.suffixCurrency ? props.suffixCurrency : ''}`}</span>
                        </Typography>
                        {props.secondaryText &&
                            <Typography variant="body2">
                                {`${props.secondaryText}`}
                            </Typography>
                        }
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}