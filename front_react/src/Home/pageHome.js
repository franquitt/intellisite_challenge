import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import AppBar from "../Shared/Components/AppBar";
import SaveIcon from '@material-ui/icons/Save';
import {useEffect, useState} from "react";
import {get} from "../Shared/Helpers/HttpService";
import { uuid4 } from 'uuidv4';

const columns = [
	{field: 'date', headerName: 'Date', width: 120},
	{field: 'day_week', headerName: 'Day of Week', width: 180},
	{field: 'hour', headerName: 'Hour', width: 130},
	{field: 'camera_uuid', headerName: 'Camera', width: 170},
	{field: 'instance', headerName: 'Instance', width: 160},
	{field: 'anomaly_names', headerName: 'Anomalies', width: 320},
];


const PageHome = () => {
	const [rows, setRows] = useState([]);

	const loadAnomalies = async () => {
		const anomalies = (await get('/api/anomalies/?limit=1800')).data;
		const payload = anomalies.map(anomaly=>{
			const date_obj = new Date(anomaly.timestamp);
			let anomaly_names = [];

			anomaly.events[0].alerts.forEach(anomaly_alert=>{
				anomaly_names.push(anomaly_alert.name);
			});


			return {
				id: uuid4(),
				date: date_obj.toLocaleDateString("es-AR", {year: 'numeric', month: '2-digit', day: '2-digit'}),
				hour: date_obj.toLocaleDateString("es-AR", {hour: '2-digit', minute: '2-digit'}).split(" ")[1],
				day_week: date_obj.getDay(),
				camera_uuid: anomaly.camera_uuid,
				instance: anomaly.events[0].instance,
				anomaly_names: anomaly_names.join(", ")
			}
		});
		setRows(payload)
	}
	useEffect(() => {
		loadAnomalies();
	}, []);

	return (
		<Paper style={{
			backgroundColor: "#eaeaea",
			width: '100%',
			height: '100%',
			position: 'absolute'
		}}>
			<AppBar/>
			<Grid container justify={'center'} spacing={5} style={{marginTop: 30}}>
				<Grid item xs={1} />
				<Grid item xs={2}>
					<Typography variant="h6">
						Anomalies
					</Typography>
				</Grid>
				<Grid item xs={6} />

				<Grid item xs={7}>
					<Paper>
						<div style={{height: 400, width: '100%'}}>
							<DataGrid rows={rows} columns={columns} pageSize={25}/>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={6}/>
				<Grid item xs={2}>
					<Button
						variant="contained"
						color="primary"
						size="large"
						startIcon={<SaveIcon/>}
						onClick={() => {
							window.location = 'http://localhost:8000/api/anomalies/csvfile';
						}}
					>
						DOWNLOAD CSV
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default PageHome;
