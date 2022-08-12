import ModalBank from "./modal";
import React from "react";
import { Container, Grid, CardContent, Typography, Card, CardActionArea, Button } from "@mui/material";
import ExpenseTable from "../../blocks/table/table";
import { Navigate } from "react-router-dom";
import { BANK_HEADER } from "../../modal/bankHeader";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AddIcon from '@mui/icons-material/Add';
import ContentLoader from "../../blocks/contentLoader";

export default class Limit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banks: [],
            open: false,
            type: 'add',
            bank: {},
            loading: true,
            accountNavigate: false,
            accountNavigateId: -1,
            loader: true
        }
        this.header = BANK_HEADER
    }

    loadingComplete() {
        this.setState({ loading: false });
    }

    handleAddBank(newBank, _self) {
        let data = _self.state.banks;
        data.push(newBank)
        _self.setState({ banks: data });
    }

    handleOpenModal(_self) {
        _self.setState({ open: true })
    }

    handleDeleteBank(bank, _self) {
        let fetchIndex = _self.state.banks.map(bank => bank.ID).indexOf(bank.ID);
        if (fetchIndex) {
            _self.state.banks.splice(fetchIndex, 1);
        }
        _self.setState({ banks: _self.state.banks });
    }

    handleCloseModal(_self) {
        _self.setState({ open: false });
        _self.setState({ type: 'add' });
        _self.setState({ bank: {} });
    }

    handleEditBank(data, _self) {
        _self.setState({ type: 'edit' });
        _self.setState({ open: true });
        _self.setState({ bank: data });
    }

    handleEditCallback(id, data, _self) {
        let banksData = _self.state.banks;
        for (let inc = 0; inc < banksData.length; ++inc) {
            if (banksData[inc].ID === id) {
                let keys = Object.keys(data);
                keys.forEach(key => {
                    banksData[inc][key] = data[key];
                });
            }
        }
        _self.setState({ banks: banksData });
    }

    fetchLimit(){
        return fetch(`http://localhost:3000/limit`), {
            headers: {
                'user-id': JSON.parse(sessionStorage.getItem('user')).username
            }
        };
    }

    fetchCategory(){
        return fetch('http://localhost:3000/category', {
            headers: {
                'user-id': JSON.parse(sessionStorage.getItem('user')).username
            }
        });   
    }

    componentDidMount() {
        fetch('http://localhost:3000/bank', {
            headers: {
                'user-id': JSON.parse(sessionStorage.getItem('user')).username
            }
        }).then(res => res.json())
            .then(res => {
                let data = [];
                res.Items.forEach(item => {
                    data.push(item);
                });
                this.setState({ banks: data })
                this.loadingComplete();
                this.setState({ loader: false });
            }).catch(err => {
                console.error(err);
                this.setState({ loader: false });
            });
    }

    showAction(data, _self) {
        _self.setState({ accountNavigateId: data.ID });
        _self.setState({ accountNavigate: true });
    }

    render() {
        return (
            <>
                <Container maxWidth sx={{ 'margin-top': '40px' }}>
                    {this.state.loader ? <>
                        <ContentLoader heading={'Fetching Bank Details'}>
                        </ContentLoader>
                    </> :
                        <>
                            {(this.state.banks.length === 0) ?
                                <>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Card sx={{ textAlign: 'center' }}>
                                                <CardContent>
                                                    <Typography variant="h1" component="div">
                                                        <AccountBalanceOutlinedIcon fontSize="30"></AccountBalanceOutlinedIcon>
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        No Banks details have been added yet.
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        To record the expense and apply limit enter the bank details and account tags with bank. Click on add button to add the bank details.
                                                    </Typography>
                                                </CardContent>
                                                <CardActionArea>
                                                    <Button size="large" onClick={() => this.handleOpenModal(this)} >
                                                        <AddIcon sx={{ mr: 1 }} />
                                                        Add Bank Details
                                                    </Button>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </> :
                                <>
                                    <ExpenseTable
                                        action
                                        showAction
                                        editAction
                                        deleteAction
                                        addAction
                                        loader={this.state.loader}
                                        dataset={this.state.banks}
                                        headers={this.header}
                                        showActionCallback={(row) => this.showAction(row, this)}
                                        editActionCallback={(row) => this.handleEditBank(row, this)}
                                        deleteActionCallback={(row) => this.handleDeleteBank(row, this)}
                                        addActionCallback={() => this.handleOpenModal(this)}
                                    >
                                        <span>Bank Detail</span>
                                        <span>Total Amount: {10}</span>
                                    </ExpenseTable>
                                </>

                            }
                        </>}

                    <ModalBank openModal={this.state.open} type={this.state.type}
                        bank={this.state.bank}
                        closeModalCallback={() => this.handleCloseModal(this)}
                        addCallback={(data) => this.handleAddBank(data, this)}
                        editCallback={(id, data) => this.handleEditCallback(id, data, this)}
                    ></ModalBank>
                    {this.state.accountNavigate && <Navigate to={`/account?bankId=${this.state.accountNavigateId}`} replace={true} />}
                </Container>
            </>
        );
    }
}

