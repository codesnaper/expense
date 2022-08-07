import { useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Paper, Tab, Tabs } from "@mui/material";

export default function Chart(props) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [value, setValue] = useState(0);
  const handleValue = (event) => setValue(event.target.value);

  return (
    <>
      <Paper elevation={6} style={{ padding: '10px', marginBottom: '12px' }} >
      <Tabs
        value={value}
        onChange={handleValue}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab label="Chart" />
      </Tabs>
      <Pie
              data={props.data}
            />
      </Paper>
    </>
  );
}