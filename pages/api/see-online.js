const testOnline = async (req, res) =>{	

	fetch('https://ead.ifms.edu.br').then((response) => {
		res.setHeader("Access-Control-Allow-Origin", "*");

		res.status(200).json({status: response.ok})	
	})
}

export default testOnline;
