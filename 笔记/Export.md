# 导出Export
### 分类
- #### `export default` ===>
    - ##### 一个*模块* (一般就是一个js文件)中包含的某个*功能* (函数,变量等),但是书写者不想给这个功能取名名字(毕竟取名秃头),而是让导入者自己来命名(毕竟秃头的事还是让别人去做)
    - #### 举例: 
        - ~~~js
            <!-- export.js -->
            export default function(){
                console.log("我不想秃头");
            }

            <!-- 然后来到导入的模块进行导入 -->

            <!-- import.js -->
            import con_bald from './export.js'
            con_bald()
          ~~~
    > **重要:** export default 在同一个导出文件里，*不允许*存在多个
- #### `export xxx` ===>
    - #### 导出一个模块(函数对象),不过这个模块要自己取名
    - #### 举例:
        - ~~~js
            <!-- export.js -->
            export function con_bald(){
                console.log('bald');
            }

            <!-- 然后来到导入的模块进行导入 -->

            <!-- import.js -->
            import {con_bald as bald} from './export.js'
          ~~~
    > 这个可以让导入者自己在取名,毕竟人无完人，有一群人都取名上帝，你让地府勾人时总不能全部勾过来把
> **我不想写了给个网址自己看吧**===>[传送门](https://zh.javascript.info/import-export)
