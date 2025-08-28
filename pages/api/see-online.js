const testOnline = async (req, res) =>{	

	fetch('https://ead.ifms.edu.br', {signal: AbortSignal.timeout(2000)})
	.then((response) => {

		res.status(200).json({status: response.ok})	
	})
	.catch( (err) => {
		res.status(200).json({status: false})		
	})

	return
}

export default testOnline;
