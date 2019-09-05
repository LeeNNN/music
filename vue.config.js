module.exports = {
    configureWebpack: {
        //开发环境的配置
        devServer: {
            proxy: { //使用代理
                "/musichall": {
                    target: "https://c.y.qq.com",
                    changeOrigin: true
                },
                "/splcloud": {
                    target: "https://c.y.qq.com",
                    changeOrigin: true,
                    headers: {// 绕过referer限制
                        referer: "https://c.y.qq.com",
                        host: "c.y.qq.com"
                    }
                },
                "/v8": {
                    target: "https://c.y.qq.com",
                    changeOrigin: true
                }
            }
        }
    }
}