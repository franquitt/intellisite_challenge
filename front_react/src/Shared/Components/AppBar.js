import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

const AppBarComponent = () => {
	return <AppBar position="static">
		<Toolbar>
			<img
				alt={'intellisite logo'}
				src={'https://www.intellisite.io/wp-content/themes/custom-theme/assets/img/header-black-logo1.png'}
				style={{width: "125px"}}
			/>
			<Typography variant="h6">
				Challenge Fullstack - IntelliSite
			</Typography>
		</Toolbar>
	</AppBar>
}

export default AppBarComponent;
