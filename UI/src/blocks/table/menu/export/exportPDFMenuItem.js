import { CsvBuilder } from 'filefy';


export default function ExportCSVMenuItem(props) {

    const handleExportCSV = () => {
        const builder = new CsvBuilder(`${props.heading}.csv`);
        builder
            .setDelimeter(',')
            .setColumns(props.columns)
            .addRows(props.rows)
            .exportFile();
    }

    return (<>
        <MenuItem key={column}>
            <Button onClick={handleExportCSV} variant="text">Exposed as CSV</Button>
        </MenuItem>
    </>);
}