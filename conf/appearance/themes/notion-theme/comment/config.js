const config = {
  api_token:"" , //在 设置 - 关于 里查看 API token
  icons:{
    comment:'<svg viewBox="0 0 16 16"  style="width: 14px; height: 14px; display: block; flex-shrink: 0; backface-visibility: hidden;"><path d="M4.32 15.424c.39 0 .677-.192 1.149-.609l2.344-2.064h4.116c2.057 0 3.213-1.19 3.213-3.22V4.22c0-2.03-1.156-3.22-3.213-3.22H3.213C1.163 1 0 2.19 0 4.22V9.53c0 2.037 1.196 3.22 3.165 3.22h.28v1.675c0 .608.322.998.875.998zm.342-1.531v-1.949c0-.403-.178-.56-.56-.56H3.26c-1.285 0-1.9-.65-1.9-1.894V4.26c0-1.243.615-1.893 1.9-1.893h8.627c1.278 0 1.893.65 1.893 1.894v5.23c0 1.243-.615 1.893-1.893 1.893h-4.15c-.417 0-.622.068-.909.369l-2.167 2.14z"></path></svg>',
    brush:'<svg t="1628848791142" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3646" width="32" height="32"><path d="M768 448a64 64 0 0 1-64 64h-640A64 64 0 0 1 0 448v-298.666667A64 64 0 0 1 64 85.333333h640A64 64 0 0 1 768 149.333333V256h192a64 64 0 0 1 63.701333 57.856L1024 320v260.736a64 64 0 0 1-49.92 62.421333l-5.888 1.066667L512 703.104V981.333333a42.666667 42.666667 0 0 1-37.674667 42.368L469.333333 1024a42.666667 42.666667 0 0 1-42.368-37.674667L426.666667 981.333333v-296.96a64 64 0 0 1 49.92-62.464l5.888-1.024L938.666667 561.962667V341.333333h-170.666667zM682.666667 170.666667H85.333333v256h597.333334V170.666667z" p-id="3647"></path></svg>',
  },
  attrs: {
    // 块属性
    type: {
      // 块属性类型值
      heading: "heading", // 标题
      quote: "quote", // 原文引用
      comment: "comment", // 评论
      container: "container", // 容器
    },
  },
}

export default config