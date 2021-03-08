const testOnline = async (req, res) =>{	

	fetch('https://ead.ifms.edu.br').then((response) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Request-Headers", "*");
		res.setHeader("Access-Control-Request-Method", "*");

		res.status(200).json({status: response.ok})	
	})
}

export default testOnline;
