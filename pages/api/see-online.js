const testOnline = async (req, res) =>{	

	fetch('https://ead.ifms.edu.br').then((response) => {

		res.status(200).json({status: response.ok})	
	})

	return
}

export default testOnline;
