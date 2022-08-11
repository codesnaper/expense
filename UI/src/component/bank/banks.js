import ModalBank from "./modal";
import React from "react";
import { Container } from "@mui/material";
import ExpenseTable from "../../blocks/table/table";
import { Navigate } from "react-router-dom";
function createData(ID, name, location, currency, tags, creditAmount, debitAmount, accounts) {
    return {
        ID,
        name,
        location,
        currency,
        tags,
        creditAmount,
        debitAmount,
        accounts,
    }
};

export default class Bank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banks: [],
            open: false,
            type: 'add',
            bank: {},
            loading: true,
            accountNavigate: false,
            accountNavigateId: -1
        }
        this.header = [
            {
                mapName: 'USERID',
                alias: 'User ID',
                isPrimaryKey: false,
                isVisible: true,
                display: 'hidden'
            },
            {
                mapName: 'name',
                alias: 'Bank Name',
                isPrimaryKey: false,
                isVisible: true,
            },
            {
                mapName: 'currency',
                alias: 'Currency',
                isPrimaryKey: false,
                isVisible: true,
            },
            {
                mapName: 'location',
                alias: 'Bank Location',
                isPrimaryKey: false,
                isVisible: true,
            },
            {
                mapName: 'ID',
                alias: 'Bank Id',
                isPrimaryKey: false,
                isVisible: true,
                display: 'hidden'
            },
            {
                mapName: 'accounts',
                alias: 'Total Account',
                isPrimaryKey: false,
                isVisible: true,
            },
            {
                mapName: 'debitAmount',
                alias: 'Total Debit Amount',
                isPrimaryKey: false,
                isVisible: true,
            },
            {
                mapName: 'creditAmount',
                alias: 'Total Credit Amount',
                isPrimaryKey: false,
                isVisible: true,
            },
            {
                mapName: 'tags',
                alias: 'Tags',
                isPrimaryKey: false,
                isVisible: true,
                type: 'tag'
            }
        ]
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

    componentDidMount() {
        fetch('http://localhost:3000/bank', {
            headers: {
                'user-id': JSON.parse(sessionStorage.getItem('user')).username
            }
        }).then(res => res.json())
            .then(res => {
                let data = [];
                res.Items.forEach(item => {
                    data.push(createData(item.ID, item.name, item.location, item.currency, item.tags, item.creditAmount, item.debitAmount, item.accounts));
                });
                this.setState({ banks: data })
                this.loadingComplete();
            }).catch(err => console.error(err));
    }

    showAction(data, _self) {
        _self.setState({ accountNavigateId: data.ID });
        _self.setState({ accountNavigate: true });
    }

    render() {
        return (
            <>
                <Container maxWidth sx={{ 'margin-top': '40px' }}>
                    <ExpenseTable
                        action
                        showAction
                        editAction
                        deleteAction
                        addAction
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

