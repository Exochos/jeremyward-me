/* eslint-disable react/react-in-jsx-scope */
function Main() {
	return (
		<div>
			<h1>Welcome to my personal webpage, built with react and mongodb!</h1>
			<img
				src='./me.jpg'
				alt='me'
				className='card-img-top'
				height={600}
				style={{borderRadius: '50%'}}
			/>
		</div>
	);
}

export default Main;
