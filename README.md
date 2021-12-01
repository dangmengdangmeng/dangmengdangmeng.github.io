## 部署到github.io流程

更改完代码后 先提交到此分支 然后本地build  build完后 执行npm run deploy 命令行出现published就代表发布到github page上了
## deploy 工作原理
deploy以后 会自动寻找根目录的build文件夹 然后将build文件夹提交到master分支   github设置了 github page 以后 会自动部署提交到master的代码
