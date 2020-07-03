下载依赖：
npm install shelljs
npm install
本地调试：
npm run dev
本地调试步骤：
在管理后台创建教室
如有老师链接console.roadofcloud.net/236206998/10037/1/0
用该教室链接正常进入后将地址栏链接域名换成自己本机ip
如：https://rddoccdnws.roadofcloud.net/static/h5_live_2.6.2.2/index.html#/?host=console.roadofcloud.net&domain=1209gwcs&param=LlaKDJWV1N9qrE9XbGM_U8N2rLMAonu69M6T3A_87AkOG-MzvzsTrQrgXHGWe7y8jepGWe_l6xB05Jm96_4yDaGYdvk1Ps8AXpfhmpLcYGazEJLf7CrDTbOqSkuAfFoVjUB1lCgdAIw&timestamp=1586497586&roomtype=3&logintype=0&video=320*240&companyidentify=1&entryUserId=03925c64-c0aa-8dc5-9fcd-98154599aafe
替换成：https://本机ip:端口/index.html#/?host=console.roadofcloud.net&domain=1209gwcs&param=LlaKDJWV1N9qrE9XbGM_U8N2rLMAonu69M6T3A_87AkOG-MzvzsTrQrgXHGWe7y8jepGWe_l6xB05Jm96_4yDaGYdvk1Ps8AXpfhmpLcYGazEJLf7CrDTbOqSkuAfFoVjUB1lCgdAIw&timestamp=1586497586&roomtype=3&logintype=0&video=320*240&companyidentify=1&entryUserId=03925c64-c0aa-8dc5-9fcd-98154599aafe
打包：
npm run build

大房间规则变化：
1、客户端不会收到用户进出房间的消息。
2、非特殊身份的人（学生）未上台的情况下，改变自己的用户属性不会转发给其他人，只有自己能收到（除publishstate外）。
3、要避免所有学生一起发送某条信令的情况。
