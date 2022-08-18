import { Button, MenuItem, Tooltip } from '@mui/material';
import { CsvBuilder } from 'filefy';
import { Header } from '../../../../modal/Header';

export interface ExportCSVMenuItemProps{
    columns: Header[],
    rows: string[][],
    heading: string,
    id: string
}
export default function ExportCSVMenuItem(props: ExportCSVMenuItemProps) {

    const handleExportCSV = () => {
        const builder = new CsvBuilder(`${props.heading}.csv`);
        builder
            .setDelimeter(',')
            .setColumns(props.columns.map((header: Header) => header.alias))
            .addRows(props.rows)
            .exportFile();
    }

    return (<>
        <MenuItem key={'pdf-export'}>
            <Tooltip role='tooltip' aria-describedby='Tooltip helper for Export button' title='Export the table in CSV file' arrow>
                <Button
                    role='button'
                    aria-label='Export PDF'
                    aria-controls={props.id}
                    aria-describedby='Button to enable CSV'
                    aria-haspopup="true"
                    onClick={handleExportCSV}
                    variant="text">
                    Exposed as CSV
                </Button>
            </Tooltip>
        </MenuItem>
    </>);
}