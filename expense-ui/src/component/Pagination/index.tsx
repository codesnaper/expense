import { TablePagination } from "@mui/material";
import { useState } from "react";

interface PaginationProps {
    totalElement: number;
    page: number;
    pageSize: number;
    onPageEvent: (pageNo: number, pageSize: number) => void;
}
export default function Pagination(props: PaginationProps) {

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        props.onPageEvent(newPage, props.pageSize);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        props.onPageEvent(props.page, parseInt(event.target.value, 10));
      };

    return (<>
        <TablePagination
            SelectProps={{
                inputProps: {
                    'aria-label': 'rows per page',
                },
                native: true,
            }}
            component="div"
            count={props.totalElement}
            page={props.page}
            onPageChange={handleChangePage}
            rowsPerPage={props.pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>)
}