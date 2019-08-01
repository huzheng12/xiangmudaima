

// 启动配置


module.exports = {
    publicPath: "",  // 公共路径

    devServer: {
        host: "localhost",
        port: 8080,
        open: true,   // 自动打开浏览器 
        proxy: {  // 反向代理 
            "/vues": {
                target: "https://localhost:1902",
                changeOrigin: true,
            }
        }
    }
}


// /vue/login
// /vue/getGoods   

// /vue  ===>  http://localhost:1902

