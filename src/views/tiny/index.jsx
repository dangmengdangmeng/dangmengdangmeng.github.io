import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import zh_CN from "./zh_CN";
import './index.less'
/**
 * @description tiny是否可以使用的标准
 * 1.当前功能是否长期免费  ok
 * 2.上传图片问题 	ok
 * */
const TinyEditor = () => {
	const editorRef = useRef(null);
	const content = "<p><span style=\"line-height:2.5\"><span style=\"font-size:18px\"><span style=\"color:#000000\">接口调用规则</span></span></span></p><p><span style=\"line-height:2.5\"><span style=\"font-size:16px\"><span style=\"color:#000000\">请求说明</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">开放平台业务接口，目前只支持访问协议是HTTPS，请求方式是POST的一种请求方式。</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">指定参数格式为：application/x-www-form-urlencoded</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">字符编码为：UTF-8</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">请求地址：实名认证完成后登录开发者中心获取www前缀，拼接对应文档地址即可。</span></span></span></p><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\">参数说明</span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">请求所有接口均需要携带的参数，用于开发者身份认证和数据安全校验。</span></span></span></p><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\"><span style=\"color:#000000\">a. 请求参数（请求体）列表：</span></span></span></p><table ><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\"><span style=\"color:#000000\">名称</span></span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\"><span style=\"color:#000000\">类型</span></span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\"><span style=\"color:#000000\">是否必填</span></span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\"><span style=\"color:#000000\">说明</span></span></span></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">timestamp</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Long</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Y</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">13位毫秒级时间戳，开放平台限制请求有效时间为10分钟（开放平台收到请求的时间-合作方传入调用接口传入的timestamp &gt;0 &amp;&amp; &lt;= 10分钟）</span></span></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">appKey</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">String</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Y</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">开发者Key</span></span></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">signature</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">String</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Y</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">签名（生成方式参照下方签名规则）</span></span></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">version</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Double</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Y</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">版本号，固定传2.0</span></span></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">requestBody</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">String</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Y</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">业务参数json串加密生成（生成方式参照下方加密规则）</span></span></td></tr></table><p></p><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\"><span style=\"color:#000000\">b. 请求的HTTP头域（请求头）字段列表：</span></span></span></p><table ><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\"><span style=\"color:#000000\">类型</span></span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\"><span style=\"color:#000000\">是否必填</span></span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\"><span style=\"color:#000000\">说明</span></span></span></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">String</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Y</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">唯一字符串（UUID）</span></span></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">String</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Y</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">集团id</span></span></td></tr><tr><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">String</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Y</span></span></td><td colSpan=\"1\" rowSpan=\"1\"><span style=\"font-size:14px\"><span style=\"line-height:1.75\">店铺id(店铺权限必传)</span></span></td></tr></table><p></p><p><span style=\"line-height:2.5\"><span style=\"font-size:16px\"><span style=\"color:#000000\">签名规则</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">注意：为防止API调用过程中被黑客恶意篡改，调用任何一个API都需要携带签名，开放平台服务端会根据请求参数，对签名进行验证，签名不合法的请求将会被拒绝。</span></span></span></p><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\"><span style=\"color:#000000\">签名生成步骤：</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">1）请求公共参数timestamp、appKey、version参与签名，业务参数对象A（业务参数整体称为对象A）中的所有非空基本类型字段参与签名，复杂类型字段中的基本类型字段参与签名，复杂类型列表取列表中的第一个复杂类型对象中的基本类型字段参与签名，注意请求头不参与签名；</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">2）将所有参与签名字段按照参数名的字典顺序排序(忽略大小写)；</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">3）将参数以参数1值1参数2值2...的顺序拼接，例如a=&amp;c=3&amp;b=1，变为b1c3；</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">4）开发者秘钥以appSecret=xxx按第一步规则拼接到排序字符串中，例如a=&amp;c=3&amp;e=1，变为appSecretxxxc3e1；</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">5） 按 key+排序后的参数+secret，得到加密前字符串；</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">6）对加密前的字符串进行sha1加密并转成16进制编码，然后转为大写字符串，得到签名；</span></span></span></p><p><span style=\"color:#282828\"><span style=\"font-size:14px\"><span style=\"line-height:2.5\">7）将得到的签名赋给signature作为请求的参数；</span></span></span></p><p></p><p><span style=\"line-height:2.5\"><span style=\"font-size:16px\"><span style=\"color:#000000\">签名示例：</span></span></span></p><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\"><span style=\"color:#000000\">a. 公共参数示例：</span></span></span></p><pre><code><span style=\"font-size:14px\"><span style=\"line-height:1.75\">{<br/>  &quot;timestamp&quot;: 1553855818682,<br/>  &quot;appKey&quot;: 3,<br/>  &quot;version&quot;: 2.0<br/>}</span></span></code></pre><p></p><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\"><span style=\"color:#000000\">b.业务参数示例：</span></span></span></p><pre><code><span style=\"font-size:14px\"><span style=\"line-height:1.75\">{<br/>  &quot;msgType&quot;: 120,<br/>  &quot;header&quot;: {<br/>    &quot;userID&quot;: &quot;5b2238f34666696b&quot;<br/>  },<br/>  &quot;order&quot;: {<br/>    &quot;isAlreadyPaid&quot;: 1,<br/>    &quot;takeoutAddress&quot;: &quot;北京西直门&quot;,<br/>    &quot;userInfo&quot;: {<br/>      &quot;userName&quot;: &quot;sdkMap测试&quot;,<br/>      &quot;userMobile&quot;: &quot;17600066358&quot;,<br/>      &quot;cardNo&quot;: &quot;902312078000&quot;<br/>    },<br/>    &quot;foodAmount&quot;: &quot;0.00&quot;,<br/>    &quot;payment&quot;: [<br/>      {<br/>        &quot;paymentStatus&quot;: &quot;20&quot;,<br/>        &quot;dueAmount&quot;: &quot;0.01&quot;<br/>      }<br/>    ],<br/>    &quot;orderItem&quot;: [<br/>      {<br/>        &quot;foodName&quot;: &quot;宫保鸡丁1&quot;,<br/>        &quot;vipPrice&quot;: &quot;0.01&quot;<br/>      },<br/>      {<br/>        &quot;foodName&quot;: &quot;宫保鸡丁2&quot;,<br/>        &quot;vipPrice&quot;: &quot;0.02&quot;<br/>      }<br/>    ]<br/>  }<br/>}</span></span></code></pre><p></p><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\"><span style=\"color:#000000\">c. 签名字段拼接</span>：(appSecret非业务参数传输)</span></span></p><pre><code><span style=\"font-size:14px\"><span style=\"line-height:1.75\">keyappKey3appSecret12345678cardNo902312078000dueAmount0.01foodAmount0.00foodName宫保鸡丁</span></span><br/><span style=\"font-size:14px\"><span style=\"line-height:1.75\">1isAlreadyPaid1msgType120paymentStatus20takeoutAddress北京西直门</span></span><br/><span style=\"font-size:14px\"><span style=\"line-height:1.75\">timestamp1553855818682userID5b2238f34666696buserMobile17600066358userNamesdkMap测试</span></span><br/><span style=\"font-size:14px\"><span style=\"line-height:1.75\">version2.0vipPrice0.01secret</span></span></code></pre><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\"><br/><span style=\"color:#000000\">d. 签名生成结果：</span></span></span></p><pre><code><span style=\"font-size:14px\"><span style=\"line-height:2.5\">3DA9330FF79246A6EBF7D871D8C98DCB697B8540</span></span></code></pre><p><span style=\"line-height:2.5\"><span style=\"font-size:14px\"><br/></span><span style=\"font-size:16px\"><span style=\"color:#000000\">业务参数加密规则</span></span><span style=\"font-size:14px\"><br/><span style=\"color:#000000\">业务参数加密步骤：</span><br/>1）将业务参数转换成json格式字符串;<br/>2）用AES算法加密,秘钥为appSecret重复两遍，偏移量为appSecret重复两遍(16位秘钥不用重复)，加密模式CBC，填充模式：NoPadding<br/>3）加密后字符即为公共参数requestBody的值；</span></span></p><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\"><br/><span style=\"color:#000000\">a. 业务参数示例：</span></span></span></p><pre><code><span style=\"font-size:14px\"><span style=\"line-height:1.75\">{<br/>&quot;number&quot;:&quot;123&quot;,<br/>&quot;string&quot;:&quot;测试&quot;,<br/>&quot;double&quot;:1.0,<br/>&quot;boolean&quot;:true<br/>}<br/>开发者秘钥为：12345678</span></span></code></pre><p><span style=\"font-size:14px\"><span style=\"line-height:2.5\"><br/><span style=\"color:#000000\">b. AES加密结果：</span></span></span></p><pre><code><span style=\"font-size:14px\"><span style=\"line-height:1.75\">Vq2Kj4Z8C+hFf7VdFPbCoY3LmJgf2LM7B2a3klFxGWMlL1BAxx7v/ZZdkxqdMPXqRPjy3k0tVKgx<br/>KMTTAlbE0PGhp2LtqzouDWZaH1g9ttQ=</span></span></code></pre>";
	const uploadImgHandle = (file, succFun, failFun) => {
		// var file = blob.blob();
		console.log(file);
		succFun("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIgaOFwohofaftXTSUPZmpKblrpSrlnHDLbq1y3HQlA&s");
	};
	const [isEdit, updateIsEdit] = useState(true);
	const [previewContent, updatePreviewContent] = useState(content);
	
	const customOptions = {
		height: 500,
		language_url: zh_CN,
		language: "zh_CN",
		plugins: [
			"advlist autolink lists link image charmap print preview anchor",
			"searchreplace visualblocks code fullscreen",
			"insertdatetime media table paste code help textcolor wordcount"
		],
		images_upload_url: "/demo/upimg.php",
		images_upload_credentials: true,
		imagetools_cors_hosts: ["hualala.com"],
		imagetools_credentials_hosts: ["hualala.com"],
		images_upload_handler: uploadImgHandle,
		content_style: "img {max-width:100%;} body",
		placeholder: "暂无内容"
	};
	const previewOptions = {
		...customOptions,
		menubar: false,
		toolbar: false,
		resize: false,  // true（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
		statusbar: false // true显示 false隐藏 底部状态栏
	};
	const editOptions = {
		...customOptions,
		menubar: true,
		toolbar: "undo redo | formatselect | " +
			"bold italic textcolor backcolor | alignleft aligncenter " +
			"alignright alignjustify | bullist numlist outdent indent | " +
			"image|" +
			"removeformat | help",
		resize: true,
		statusbar: true
	};
	const handleEditBtn = () => {
		updateIsEdit(!isEdit);
	};
	const save = () => {
		updateIsEdit(!isEdit);
		if (editorRef.current) {
			updatePreviewContent(editorRef.current.getContent());
		}
	};
	return (
		<>
			<button onClick={ handleEditBtn }>{ isEdit ? "取消编辑" : "编辑" }</button>
			{
				isEdit ? <button onClick={ save }>保存内容</button> : null
			}
			<div style={ { display: isEdit ? "block" : "none" } }>
				<Editor
					onInit={ (evt, editor) => editorRef.current = editor }
					initialValue={ content }
					init={ editOptions }
				/>
			</div>
			<div className="preview-editor" style={ { display: isEdit ? "none" : "block" } }>
				<Editor
					initialValue={ previewContent }
					init={ previewOptions }
					disabled={ true }/>
			</div>
		</>
	);
};
export default React.memo(TinyEditor);
