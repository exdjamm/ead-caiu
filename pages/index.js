import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, Spinner} from "react-bootstrap";

import React,  {useState} from "react";

const estilo = {
	main:{
		justifyContent:"center",
		bgColor: "black"
	},
	header:{
		fontWeight: "bolder"
	}
}

const fetcher = async (url) => {
	const res = await fetch(url, {method:"POST"})
	return res.json()
}

const estadoEad = (okay) => {

	let text;


	if (okay == true){
		text = 'Não, volte a fazer atividades.';
	}else{
		text = "Sim, tenha um otimo dia";
		
	}

	return text
}

const Home =  () => {

	const [onOff, setOnOff] = useState(false);
	const [loding, setLoging] = useState(false);

	fetcher('./api/see-online').then((data) => {
		setOnOff(data.status)
		setLoging(true)
	});
	

	return (
		<main id='content' className="d-flex w-100 fmxw-500" style={estilo.main}>
 		<div className="d-flex my-5 mt-lg-6 mb-lg-5">
			<Card className='mb-4 mb-lg-0 shadow-soft border rounded border-light p-4 p-lg-5 ' style={{maxWidth: "50rem"}}>
				<Card.Header style={estilo.header}>O EAD CAIU?</Card.Header>
				<Card.Body>
					<Card.Title>Caiu?</Card.Title>
					<Card.Text>
						<Spinner animation="border" role="status" hidden={loding} />
						<span hidden={!loding} >{estadoEad(onOff)}</span>
						
					</Card.Text>
					<Button onClick={
						() => { 
							setLoging(false)
							fetcher('./api/see-online').then((data) => {
								setOnOff(data.status)
								setLoging(true)
							})
						}
					} variant="second">Ver novamente?</Button>
				</Card.Body>
			</Card>
		</div>
			{/*<p hidden={onOff}>
				Caiu --
			</p>
			<p hidden={!onOff}>
				Ta de pe --
			</p>*/}
		</main>
	)
}



export default Home;