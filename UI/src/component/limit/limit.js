import React from "react";
import { Container } from "@mui/material";

export default class Limit extends React.Component {
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


    render() {
        return (
            <>
                <Container maxWidth sx={{ 'margin-top': '40px' }}>
                </Container>
            </>
        );
    }
}

