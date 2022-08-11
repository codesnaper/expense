import ModalBank from "./modal";
import React from "react";
import { Breadcrumbs, Container, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ExpenseTable from "../../blocks/table/table";


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}



export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.id = getParameterByName("bankId");
        this.state = {
            accounts: [],
            open: false,
            type: 'add',
            account: { bankId: this.id },
            bank: {},
            loading: true,
        }
        this.header = [
            {
                mapName: 'isInterest',
                alias: 'Interest Account',
                isPrimaryKey: false,
                isVisible: true,
                type: 'boolean'
            },
            {
                mapName: 'loanType',
                alias: 'Loan Account',
                isPrimaryKey: false,
                isVisible: true,
                type: 'boolean'
            },
            {
                mapName: 'interestAmount',
                alias: 'Interest Amount',
                isPrimaryKey: false,
                isVisible: true
            },
            {
                mapName: 'emiPaid',
                alias: 'Paid EMI',
                isPrimaryKey: false,
                isVisible: true
            },
            {
                mapName: 'BANKID',
                alias: 'Bank Id',
                isPrimaryKey: false,
                isVisible: false,
                display: 'hidden'
            },
            {
                mapName: 'principal',
                alias: 'Total Account',
                isPrimaryKey: false,
                isVisible: true
            },
            {
                mapName: 'maturityAmount',
                alias: 'Maturity Account',
                isPrimaryKey: false,
                isVisible: true
            },
            {
                mapName: 'totalPayment',
                alias: 'Total Amount',
                isPrimaryKey: false,
                isVisible: true
            },
            {
                mapName: 'rate',
                alias: 'Interest Rate',
                isPrimaryKey: false,
                isVisible: true
            },
            {
                mapName: 'interest',
                alias: 'Interest Account',
                isPrimaryKey: false,
                isVisible: true,
                type: 'boolean'
            },
            {
                mapName: 'accountNo',
                alias: 'Account Number',
                isPrimaryKey: false,
                isVisible: true
            },
            {
                mapName: 'name',
                alias: 'Account Name',
                isPrimaryKey: false,
                isVisible: true
            },
            {
                mapName: 'ID',
                alias: 'ID',
                isPrimaryKey: true,
                isVisible: true,
                display: 'hidden'
            },
            {
                mapName: 'openDate',
                alias: 'Account Opening Date',
                isPrimaryKey: false,
                isVisible: true,
                type: 'date'
            },
            {
                mapName: 'totalInterest',
                alias: 'Total Interest',
                isPrimaryKey: false,
                isVisible: true
            },
            {
                mapName: 'tenure',
                alias: 'Tenure',
                isPrimaryKey: false,
                isVisible: true
            },
        ]
    }

    loadingComplete() {
        this.setState({ loading: false });
    }

    handleAddAccount(newAccount, _self) {
        let data = _self.state.accounts;
        data.push(newAccount)
        _self.setState({ accounts: data });
    }

    handleOpenModal(_self) {
        _self.setState({ open: true })
    }

    handleDeleteAccount(id, _self) {
        let fetchIndex = _self.state.accounts.map(account => account.ID).indexOf(id);
        if (fetchIndex) {
            _self.state.accounts.splice(fetchIndex, 1);
        }
        _self.setState({ accounts: _self.state.accounts });
    }

    handleBankUpdate(bank, _self) {
        let data = _self.state.bank;
        let keys = Object.keys(bank);
        keys.forEach(key => {
            data[key] = bank[key];
        });
        _self.setState({ bank: data });
    }

    handleCloseModal(_self) {
        _self.setState({ open: false });
        _self.setState({ type: 'add' });
        _self.setState({ account: { bankId: this.id } });
    }

    handleEditAccount(data, _self) {
        _self.setState({ type: 'edit' });
        _self.setState({ open: true });
        _self.setState({ account: data });
    }

    handleEditCallback(id, data, _self) {
        let accountsData = _self.state.accounts;
        for (let inc = 0; inc < accountsData.length; ++inc) {
            if (accountsData[inc].ID === id) {
                let keys = Object.keys(data);
                keys.forEach(key => {
                    accountsData[inc][key] = data[key];
                });
            }
        }
        _self.setState({ accounts: accountsData });
    }

    componentDidMount() {
        if (this.id) {
            this.fetchAccountPromise()
                .then((res) => res.json())
                .then(res => { this.setState({ bank: res }) })
                .then(() => this.getAllAccount())
                .catch(err => console.error(err));
        }
    }

    getAllAccount() {
        fetch(`http://localhost:3000/account/${this.id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ accounts: res.Items })
                this.loadingComplete();
            })
    }

    fetchAccountPromise() {
        return fetch(`http://localhost:3000/bank/${this.id}`, {
            headers: {
                'user-id': JSON.parse(sessionStorage.getItem('user')).username
            }
        });
    }

    showAction(row) {
        alert(JSON.stringify(row));
    }

    editAction(row) {
        alert(JSON.stringify(row));
    }

    deleteAction(row) {
        alert(JSON.stringify(row));
    }

    render() {
        return (
            <>
                <Breadcrumbs sx={{ 'margin': '20px' }} separator=">" aria-label="breadcrumb">
                    {this.state.loading ? <><Skeleton sx={{ width: '15vw' }} variant="body1"></Skeleton><Skeleton sx={{ width: '15vw' }} variant="body1"></Skeleton></> : <><Link underline="hover" color="inherit" to="/bank">{this.state.bank.name}</Link></>}
                    {!this.state.loading && <Typography color="text.primary">accounts</Typography>}
                </Breadcrumbs>
                <Container maxWidth sx={{ 'margin-top': '40px' }}>
                    {/* <AccountView
                        loading={this.state.loading}
                        bankId={this.id}
                        bank={this.state.bank}
                        data={this.state.accounts}
                        openModalCallback={() => this.handleOpenModal(this)}
                        deleteCallback={(data) => this.handleDeleteAccount(data, this)}
                        editModalCallback={(data) => this.handleEditAccount(data, this)}
                    ></AccountView> */}
                    <ExpenseTable
                        action
                        showAction
                        editAction
                        deleteAction
                        addAction
                        dataset={this.state.accounts}
                        headers={this.header}
                        showActionCallback={(row) => this.showAction(row)}
                        editActionCallback={(row) => this.editAction(row)}
                        deleteActionCallback={(row) => this.deleteAction(row)}
                        addActionCallback={()=> this.handleOpenModal(this)}
                    ></ExpenseTable>
                    {/* <AccountView></AccountView> */}
                    <ModalBank openModal={this.state.open} type={this.state.type}
                        bank={this.state.bank}
                        account={this.state.account}
                        bankModalCallback={(data) => this.handleBankUpdate(data, this)}
                        closeModalCallback={() => this.handleCloseModal(this)}
                        addCallback={(data) => this.handleAddAccount(data, this)}
                        editCallback={(id, data) => this.handleEditCallback(id, data, this)}
                    ></ModalBank>
                </Container>
            </>
        );
    }
}
