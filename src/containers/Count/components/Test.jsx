import React, {useState} from "react";

const TestUse = (props) => {
	const [name, changeName] = useState('小王');
	
	const handleClick = () => {
		changeName('hhh');
	};
	return (
		<>
			名字:{name}
			<br/>
			<button onClick={handleClick}>更改名称</button>
		</>
	);
};

export default TestUse;
