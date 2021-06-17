# 框架学习

​	创建时间 2021年6月17日09:41:44，用于学习一般react、vue、webpack、或者是其他东西。  

# 项目结构

​	项目里个人文件夹用于存放自己的东西，public用于存放公共文件，例如想要学习React的语法，需要引入React.js、React-dom.js、babel.js等。放在public文件中供大家一起使用。

# git命令

## 拉取

​	`git pull` 用于拉取远程仓库并直接跟本地合并

## 添加文件

​	比如你添加了一些文件，需要添加到工作区并且提交，那就先 `git add 文件名(*)` *号表示全部文件 如果写单个文件名那就只是添加单个文件。

## 添加到暂存区

​	你已经使用 `git add 文件` 添加了文件，那就需要将当前文件添加到暂存区，使用 `git commit -m '描述'` 这个命令就是把你当前已经保存的文件添加到暂存区， -m 表示说的话，等你提交到仓库，我可以看到你提交的这个 -m 说的信息。

## 提交到主分支

​	直接提交的话就用 `git push` 推送到远程分支。当然你可以切换分支，目前还用不到。


## 查看当前文件状态

​	使用 `git status` 来查看当前文件本地环境的状态。

# 学习资料

​	React学习视频：https://www.bilibili.com/video/BV1Ey4y1u7vi?t=907

​	React相关：

1. antDesign库：https://ant.design/docs/react/introduce-cn

2. create-react-app文档：https://create-react-app.dev/

​	Vue相关：

​	webpack：https://webpack.docschina.org/
