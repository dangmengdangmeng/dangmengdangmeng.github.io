import React, { useState } from "react";
import { connect } from "react-redux";
import { increment } from "../../redux/actions/Count";
import './index.less'
const TestUse = (props) => {
	const { count, increment } = props;
	const [name] = useState("小王");
	const add = () => {
		increment(count + 1);
	};
	const rand = (m, n) => {
		return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
	};
	const handleClick = () => {
		// setTimeout(() => {
		// 	let n = rand(1, 100);
		// 	n <= 30 ? alert('恭喜你中奖了') : alert('再接再厉');
		// }, 1000);
		
		const p = new Promise((resolve, reject) => {
			setTimeout(() => {
				let n = rand(1, 100);
				n <= 30 ? resolve(n) : reject(n);
			}, 1000);
		});
		p.then((n) => {
			console.log("成功", n);
		}).catch(error => {
			console.log("error--", error);
		});
	};
	return (
		<>
			count:{ count }
			<button onClick={ add }>++</button>
			<br/>
			名字:{ name }
			<br/>
			<button className="btn11" onClick={ handleClick }>抽奖</button>
		</>
	);
};
const mapStateToProps = state => {
	return {
		count: state.count
	};
};
const mapDispatchToProps = {
	increment
};
export default connect(mapStateToProps, mapDispatchToProps)(TestUse);
