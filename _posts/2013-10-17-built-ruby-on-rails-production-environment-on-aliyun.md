---
layout: post
category : ruby 
tags : [rails, aliyun]
title: 在阿里云 (aliyun) 服务器上搭建Ruby On Rails生产环境
---
{% include JB/setup %}

最近总是在配置阿里云的服务器，遇到不少问题，现小结一下，供大家参考～～

### 1、阿里云的一键安装web全环境

  - 下载一键安装web全环境 [sh.zip]() 压缩包
  - 上传至服务器，解压、执行脚本，具体步骤详见[这里]()
  
        $ mv sh.zip /home/tmp/ & cd /home/tmp
        $ unzip sh.zip
        $ chmod -R 777 sh & cd sh
        
        # 任意选择一种方法执行脚本
        # 方法一
        $ ./install.sh
        
        # 方法二
        $ ./install_nginx_xxx.sh
        $ ./install_mysql_xxx.sh
        
### 2、安装RVM与指定的Ruby版本
  - 安装RVM与指定的Ruby版本
  
        $ curl -L https://get.rvm.io | bash -s stable --ruby=1.9.3
        
        # 注意安装完成后，根据提示执行source命令
  
  - 查看是否安装成功
        
        $ ruby -v
        ruby 1.9.3p448 (2013-06-27 revision 41675) [i686-linux]

        $ gem -v
        2.1.9
        
   - 更换 gem source，提高gem下载速度
   
        $ gem source -r https://rubygems.org/
        $ gem source -a http://ruby.taobao.org
        
### 3、安装git、编译 javascript 运行时环境 node.js

   - 安装git工具
   
        $ yum install git
        
   - 编译node.js（javascript运行时环境）
        
        $ git clone https://github.com/joyent/node.git
        $ cd node
        $ ./configure && make && make install
        
        #如果无法编译，说名需要叫python升级到2.6或2.7
        #如果缺少bz2，需要yum install bzip2-devel后，重新编译python
        
        
   - 克隆你的项目
   
        $ git clone path/to/your/project.git
        
        # 安装项目指定gem包
        $ cd path/to/your/project
        $ bundle install

### 4、配置unicorn文件并运行生产环境

  - 查看unicorn配置实例 [config/unicorn.rb](https://bitbucket.org/cod7ce/promenadefy/src/db30003a736fac73a945641ddc0590fbb16104ea/config/unicorn.rb?at=master)

  - 启动unicron生产环境
  
  
        $ unicorn_rails -c config/unicorn.rb  -E production -D
    
  - 关闭unicorn进程
  
        $ kill -9 $(cat tmp/pids/unicorn.pid )

### 5、配置nginx虚拟主机
  - 添加nginx虚拟主机配置
    
        $ vim /path/to/your/nginx/vhosts/xxxx.conf
  
  - 配置内容（将汉字替换成相应有效内容）：
  
        upstream unicorn_server
        {
          server unix:项目根目录/tmp/sockets/unicorn.sock fail_timeout=0;
        }
        server 
        {
          listen       80;
          server_name  域名;
          root 项目根目录/public;
          
          location / 
          {
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-Server $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_buffering on;
            if (!-f $request_filename) {
               proxy_pass http://unicorn_server;
               break;
            }
          }
          
          location ~ ^/(assets)/  
          {
              expires max;
              add_header Cache-Control public;
          }
        }

### 友情提示

  - 低内存服务器添加内存释放任务

        $ vim /etc/crontab
    
       在最后一行添加如下内容（每天凌晨1点释放内存）：
  
        00 1 * * * echo 3 > /proc/sys/vm/drop_caches  
        
  - 一套常用配置信息 [nginx + unicorn](https://gist.github.com/mimosz/3547765#file_nginx.conf) 
