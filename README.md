1. ### 数据库配置文件：db/index.js
2. ### 创建test数据库，再创建两张表student和class
student：
```
CREATE TABLE `student` (
  `id` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `passwd` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
class：
```
CREATE TABLE `class` (
  `classid` varchar(40) NOT NULL,
  `id` varchar(40) NOT NULL,
  `classTitle` varchar(40) NOT NULL,
  `detail` text NOT NULL,
  PRIMARY KEY (`classid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
3. ### npm install
4. ### 启动express项目 npm run nodemon
5. ### 打开localhost:9240即可预览
