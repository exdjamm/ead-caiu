import {useState} from "react";

const fetcher = async (url) => {
	const res = await fetch(url)
	return res.json()
}

const Home =  () => {

	const [onOff, setOnOff] = useState(false);

	fetcher('./api/see-online').then((data) => {
		setOnOff(data.status)
	});
	

	return (
		<div id='content'>
			<p hidden={onOff}>
				Caiu --
			</p>
			<p hidden={!onOff}>
				Ta de pe --
			</p>
		</div>
	)
}

export default Home;