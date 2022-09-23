import { TablePagination } from "@mui/material";
import { useState } from "react";

interface PaginationProps {
    totalElement: number;
    page: number;
    pageSize: number;
    onPageEvent: (pageNo: number, pageSize: number) => void;
}
export default function Pagination(props: PaginationProps) {

    const [page, setPage] = useState<number>(props.page);

    const [pageSize, setPageSize] = useState<number>(props.pageSize);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        props.onPageEvent(newPage, pageSize);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
        props.onPageEvent(page, pageSize);
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
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>)
}