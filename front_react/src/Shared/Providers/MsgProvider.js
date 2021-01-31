import React, {createContext, useState} from 'react';

export const MsgContext = createContext();

const initialHttpState = {
	type: '',
	msg: '',
	showMsg: false,
};

const initialDialog = {
	titulo: "",
	descripcion: "",
	okText: "OK",
	cancelText: "Cancelar",
	show: false,
	onConfirm: ()=>{

	}
};

const useStateContext = () => {
	const [msg, setMsgState] = useState(initialHttpState);

	const [dialog, setDialog] = useState(initialDialog);

	const setMsg = (type, msg, showMsg = true) => {
		// type : error , warning , info ,success
		setMsgState({
			type,
			msg,
			showMsg,
		});
	};

	const clearDialog = ()=>{
		setDialog(initialDialog);
	}

	return {
		...msg,
		setMsg,
		dialog,
		clearDialog,
		setDialog
	};
};

export const MsgProvider = (props) => {
	const contextState = useStateContext();

	return (
		<MsgContext.Provider value={contextState}>
			{props.children}
		</MsgContext.Provider>
	);
};
