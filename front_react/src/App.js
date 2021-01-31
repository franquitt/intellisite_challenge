import './App.css';
import Router from "./Shared/Navigation/Router";
import {MsgProvider} from "./Shared/Providers/MsgProvider";
import {HttpProvider} from "./Shared/Providers/HttpProvider";

function App() {
	return (
		<MsgProvider>
			<HttpProvider>
				<Router/>
			</HttpProvider>
		</MsgProvider>
	);
}

export default App;
