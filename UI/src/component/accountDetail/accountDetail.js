import { Breadcrumbs, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "./chart";
import EmiList from "./emiList";
import AccountForm from "./form";

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function AccountDetail(props) {

    const [loading, setLoading] = React.useState(true);
    const [account, setAccount] = React.useState({});

    const [data, setData] = React.useState({});
    const [totalMonth, setTotalMonth] = React.useState(0);
    const [endDate, setEndDate] = React.useState(null);

    const fetchAccountData = () => {
        fetch(`http://localhost:3000/account/${getParameterByName('accId')}/${getParameterByName('bankId')}`)
            .then((res) => res.json())
            .then(data => {
                setEndDate(moment(data.openDate).add(parseInt(data.tenure), 'Y'));
                setTotalMonth(moment(data.openDate).add(parseInt(data.tenure), 'Y').diff(moment(data.openDate),'months', true));
                setAccount(data);
                setData({
                    labels: ['Amount', 'Interest Amount'],
                    datasets: [
                        {
                            label: `Account Detail : ${data.name}`,
                            data: [data.principal, data.totalInterest],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                            ]
                        }
                    ]
                });
                setLoading(false);
            })
            .catch(err => setLoading(false))
    }

    useEffect(() => {
        // Update the document title using the browser API
        fetchAccountData();
    }, []);


    return (
        <>
            <Breadcrumbs sx={{ 'margin': '20px' }} separator=">" aria-label="breadcrumb">
                {loading ?
                    <>
                        <Skeleton sx={{ width: '15vw' }} variant="body1"></Skeleton>
                        <Skeleton sx={{ width: '15vw' }} variant="body1"></Skeleton>
                    </> :
                    <>
                        <Link underline="hover" color="inherit" to="/bank">Bank</Link> <span>{' > '}</span>
                        <Link underline="hover" color="inherit" to={`/account?bankId=${getParameterByName('bankId')}`}>Accounts</Link>
                    </>}
                {!loading && <Typography color="text.primary">{account.name}</Typography>}
            </Breadcrumbs>

            <div style={{ margin: '24px' }}>
                <AccountForm account={account}>
                </AccountForm>
            </div>
            <Grid container spacing={2}>    
            {data.labels && <>
                
                    <Grid item md={3} sm={6} style={{ margin: '24px' }}>
                        <Chart data={data} />
                    </Grid>
                    <Grid item md={8} sm={6} style={{ margin: '24px' }}>
                        <EmiList openDate = {account.openDate} emiPaid = {account.emiPaid} emi={account.interestAmount} month={totalMonth}/>
                    </Grid>
            </>}
            </Grid>




        </>
    );
}