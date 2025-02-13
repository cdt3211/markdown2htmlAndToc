# 介绍
本项目用于将markdown文本转换为html格式，同时附加可定位的toc(大纲目录)
## 使用到的库
`marked`、`jsdom`、`dompurify`
## 用法
输入参数`content`为markdown文本，输出参数`cleanHtmlContent`为转换后的html文本,`toc`为大纲目录。

代码会在解析md文本时同时为标题添加唯一的id标签，用于定位。

`toc`为对象格式，示例如下：
```
{
    text: {
      type: 'heading',
      raw: '### 写在后面的话\n\n',
      depth: 3,
      text: '写在后面的话',
      tokens: [Array]
    },
    slug: '写在后面的话'
}
  ```

`depth`为标题级别，h1就是1, h2就是2。
`slug`用于定位。
`toc`用法示例：
```
{toc.map((item, index) => (
  <li key={index}>
    <a href={`#${item.slug}`}>{item.text.text}</a>
  </li>
))}
```