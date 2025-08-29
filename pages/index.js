import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, Spinner} from "react-bootstrap";

import React,  {useState, useEffect} from "react";

const estilo = {
	dark:{
		main:{
			"width":"100vw",
			"height":"100vh",
			justifyContent:"center",
			display:"flex",
			alignItems:"center",
			backgroundColor: "black",
			color:"#F7F7F7"
		},
		header:{
			fontWeight: "bolder",
			color: "#F7F7F7",
			backgroundColor: "#070707"
		},
		card:{
			maxWidth: "50rem", 
			maxHeight:"50vh", 
			backgroundColor:"#010101",
			borderColor: "#343a40 !important"
		},
		cardBody:{backgroundColor: "#202020"},
		button:{
			color:"white", 
			backgroundColor:"black"
		},
		footer:{
			position: "fixed",
			bottom:"0",
			right:"0",
			padding:"1.6rem"
		},
		buttonTheme:{
			position:"fixed",
			top:"1rem",
			right:"0.2rem",
			color: "white"
		}
	},
	light: {
		main:{
			"width":"100vw",
			"height":"100vh",
			justifyContent:"center",
			display:"flex",
			alignItems:"center",
			// backgroundColor: "black",
			// color:"#F7F7F7"
		},
		header:{
			fontWeight: "bolder",
			// color: "#F7F7F7",
			// backgroundColor: "#070707"
		},
		card:{
			maxWidth: "50rem", 
			maxHeight:"50vh",
			borderColor: "#f8f9fa !important"
			// backgroundColor:"#010101"
		},
		cardBody:{
			// backgroundColor: "#202020"
		},
		button:{
			// color:"white", 
			// backgroundColor:"black"
		},
		footer:{
			position: "fixed",
			bottom:"0",
			right:"0",
			padding:"1.6rem"
		},
		buttonTheme:{
			position:"fixed",
			top:"1rem",
			right:"0.2rem"
		}
	}
}

const fetcher = async (url) => {
	const res = await fetch(url, {method:"POST"})
	
	if (res.status != 200){
	    return {
	        status: false,
	        timeout: true
	    };
	}
	
	return res.json()
}

const estadoEad = (okay, timeout) => {

	let text;
    
	if (okay == true){
		text = 'Não, volte a fazer atividades.';
	}else{
		text = "Sim, tenha um otimo dia";
	}
	
	if(timeout){
        text = "Possivelmente, sei não fikkkkk";
    }

	return text
}

const Home =  () => {
	let modo;
	let classBorder;

	if (typeof window !== 'undefined') {
		modo = localStorage.getItem("modo");
	}

	const [onOff, setOnOff] = useState(false);
	const [loding, setLoging] = useState(false);

	const [theme, setTheme] = useState(estilo.light)
	const [dark, setDark] = useState(modo)

	useEffect( () => {
		const newTheme = dark ? estilo.dark : estilo.light;
		setTheme(newTheme)	

		localStorage.setItem("modo", dark)

	}, [dark])

	const mudarPraDark = (e) => {
		setDark(!dark)
	}

	console.table({dark, modo, classBorder})

	fetcher(process.env.URL+'/api/see-online').then((data) => {
		setOnOff(data.status)
		setLoging(true)
	});
	

	return (
		<main id='content' className="d-flex w-100 fmxw-500 dark" style={theme.main}>
	 		<div className="d-flex my-5 mt-lg-6 mb-lg-5">
				<Card className="mb-4 mb-lg-0 shadow-soft border rounded p-4 p-lg-5" style={theme.card}>
					<Card.Header style={theme.header}>O EAD CAIU?</Card.Header>
					<Card.Body style={theme.cardBody}>
						<Card.Title>Caiu?</Card.Title>
						<Card.Text>
							<Spinner animation="border" role="status" hidden={loding} />
							<span hidden={!loding} >{estadoEad(onOff)}</span>
							
						</Card.Text>
						<Button onClick={
							() => { 
								setLoging(false)
								fetcher('./api/see-online').then((data) => {
									setOnOff(data.status, data.timeout)
									setLoging(true)
								})
							}
						} variant="second" style={theme.button} >Ver novamente?</Button>
					</Card.Body>
				</Card>
			</div>
			<footer style={theme.footer}>Feito por Exodo Jaffar!</footer>
			<Button variant="second" style={{... theme.buttonTheme, ...theme.button}} onClick={mudarPraDark}>Modo {dark?"Light":"Dark"}</Button>
		</main>
	)
}



export default Home;
