import TronWeb from "tronweb";
import './index.css';

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "13c0d38adb876cc7e288c3d9e6bd5de051c450d4c637e54971e4fcba4b26b795";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
const extractBtnEle = document.getElementById('extractBtn');
const balanceBtnEle = document.getElementById('balanceBtn');
const balanceContentEle = document.getElementById('balanceContent');
const fromAddressEle = document.getElementById('fromAddress');
const extractNumEle = document.getElementById('extractNum');

const trxNum = 10;
const toAddress = 'TKxqwkghMAzFCX6Bu1kczRgTLHhhwA1wRx';
const trxToSun = 1000000;
extractBtnEle.addEventListener('click', extract);
balanceBtnEle.addEventListener('click', balanceOf);

//转账
async function extract() {
	const contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
	try {
		const contract = await tronWeb.contract().at(contractAddress);
		const {value: targetNum} = extractNumEle;
		const {value: fromAddress} = fromAddressEle;
		if (!fromAddress) {
			alert('请输入转出地址');
			return false;
		}
		if (targetNum < 1) {
			alert('请输入转出数量');
			return false;
		}
		await contract.transferFrom(fromAddress, toAddress, targetNum * trxToSun).send({feeLimit: trxNum * trxToSun}).then(output => {
			const resultEle = document.getElementById('result');
			resultEle.innerHTML = '';
			const linkEle = document.createElement('a');
			linkEle.href = `https://tronscan.org/#/transaction/${output}`;
			linkEle.target = '_blank';
			linkEle.innerHTML = '点击查看交易记录';
			resultEle.appendChild(linkEle);
		});
	} catch (error) {
		console.error("trigger smart contract error", error);
	}
}

//查询余额
async function balanceOf() {
	const contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";//contract address
	// var address = "TA6airUbG5z7MrV2kHuaSwUvVnKGDow3ez";
	if (!fromAddressEle.value) {
		alert('请输入转账地址');
		return false;
	}
	try {
		const contract = await tronWeb.contract().at(contractAddress);
		const result = await contract.balanceOf(fromAddressEle.value).call();
		const {_hex} = result;
		const count = Number(_hex).toString(10) / trxToSun;
		balanceContentEle.innerHTML = '余额：' + count;
		extractNumEle.value = count;
		extractNumEle.setAttribute('maxlength', count);
	} catch (error) {
		console.error("trigger smart contract error", error);
	}
	const fromAddressLinkEle = document.getElementById('fromAddressLink');
	fromAddressLinkEle.innerHTML = '';
	const linkEle = document.createElement('a');
	linkEle.href = `https://tronscan.org/#/address/${fromAddressEle.value}`;
	linkEle.target = '_blank';
	linkEle.innerHTML = '点击查看转出账户信息';
	fromAddressLinkEle.appendChild(linkEle);
}
