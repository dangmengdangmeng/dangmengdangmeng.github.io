import React, { Component } from "react";
import LogicFlow from "@logicflow/core";
import { Control, DndPanel, InsertNodeInPolyline, Menu, NodeResize, Snapshot } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import "./index.less";

LogicFlow.use(NodeResize);
LogicFlow.use(Snapshot);
LogicFlow.use(Control);
LogicFlow.use(Menu);
LogicFlow.use(DndPanel);
LogicFlow.use(InsertNodeInPolyline);
let lf;

class FlowChart extends Component {
	state = {
		data: {}
	};
	
	componentDidMount() {
		// if (localStorage.getItem("defaultData")) {
		// 	this.setState({ data: JSON.parse(localStorage.getItem("defaultData")) }, () => {
		// 		this.init();
		// 	});
		// }
		lf = new LogicFlow({
			container: document.querySelector("#container"),
			stopScrollGraph: true,
			stopZoomGraph: true,
			width: "100%",
			height: "100%",
			keyboard: {
				enabled: true
			},
			background: {
				color: "#fff"
			},
			grid: {
				size: 20,
				type: "dot"
			},
			guards: {
				beforeDelete() {
					return true;
				}
			}
		});
		this.init();
	}
	
	init() {
		lf.setPatternItems([
			{
				label: "圆形",
				text: "默认文字",
				icon: img1,
				type: "circle"
			},
			{
				label: "椭圆形",
				text: "默认文字",
				icon: img2,
				type: "ellipse"
			},
			{
				label: "矩形",
				text: "默认文字",
				icon: img2,
				type: "rect"
			},
			{
				label: "菱形",
				text: "默认文字",
				icon: img1,
				type: "diamond"
			},
			{
				label: "文本",
				text: "默认文字",
				type: "text",
				icon: img2
			}
		]);
		lf.addMenuConfig({
			nodeMenu: [{
				text: "添加链接",
				callback(e) {
					lf.setProperties(e.id, { link: "http://www.baidu.com" });
				}
			},
				{
					text: "删除链接",
					callback(e) {
						lf.setProperties(e.id, { link: "" });
					}
				}]
		});
		lf.setTheme(
			{
				nodeText: { autoWrap: true, lineHeight: 1.5 },
				ellipse: {
					fill: "green"
				},
				edgeText: {
					autoWrap: true,
					lineHeight: 1.5,
					background: {
						fill: "#fff"
					}
				}
			}
		);
		lf.render(this.state.data);
		
		lf.on("element:click", ({ data }) => {
			if (data.properties.link) {
				window.open(data.properties.link);
			}
		});
	}
	
	handleBtnClick = type => {
		switch (type) {
			case "save":
				localStorage.setItem("defaultData", JSON.stringify(lf.getGraphData()));
				break;
			case "export":
				lf.getSnapshot();
				break;
			default:
		}
	};
	
	render() {
		return (
			<>
				<h2>已有配置:</h2>
				<h4>页面功能:</h4>
				<ul>
					<li>上一步</li>
					<li>下一步</li>
					<li>放大</li>
					<li>缩小</li>
					<li>保存</li>
					<li>导出图片</li>
				</ul>
				<h4>元素功能:</h4>
				<ul>
					<li>复制(选中后control+c或选中后右键)</li>
					<li>粘贴(选中后control+v或选中后右键)</li>
					<li>删除(选中后delete或选中后右键)</li>
					<li>编辑文本(双击或右键)</li>
					<li>添加链接(右键)</li>
					<li>删除链接(右键)</li>
					<li>访问链接(单击元素)</li>
					<li>放大缩小(椭圆和矩形选择后 选择四个角进行拖拽)</li>
				</ul>
				<div>
					<button onClick={ () => this.handleBtnClick("save") }>保存</button>
					<button onClick={ () => this.handleBtnClick("export") }>导出</button>
				</div>
				<h2>拖拽面板的元素到主区域</h2>
				<div id="container" style={ { width: "1000px", height: "1000px" } }/>
			</>
		);
	}
}

export default FlowChart;
