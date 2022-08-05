import ModalBank from "./modal";
import BankView from "./view";
import React from "react";
import { Container } from "@mui/material";
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
            loading: true
        }
    }

    loadingComplete(){
        this.setState({loading: false});
    }

    handleAddBank(newBank, _self) {
        let data = _self.state.banks;
        data.push(newBank)
        _self.setState({ banks: data });
    }

    handleOpenModal(_self) {
        _self.setState({ open: true })
    }

    handleDeleteBank(id, _self) {
        let fetchIndex = _self.state.banks.map(bank => bank.ID).indexOf(id);
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
                'user-id': '13232'
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

    render() {
        return (
            <>
                <Container maxWidth sx={{ 'margin-top': '40px' }}>
                    <BankView
                        loading={this.state.loading}
                        data={this.state.banks}
                        openModalCallback={() => this.handleOpenModal(this)}
                        deleteCallback={(data) => this.handleDeleteBank(data, this)}
                        editModalCallback={(data) => this.handleEditBank(data, this)}
                    ></BankView>
                    <ModalBank openModal={this.state.open} type={this.state.type}
                        bank={this.state.bank}
                        closeModalCallback={() => this.handleCloseModal(this)}
                        addCallback={(data) => this.handleAddBank(data, this)}
                        editCallback={(id, data) => this.handleEditCallback(id, data, this)}
                    ></ModalBank>
                </Container>
            </>
        );
    }
}

