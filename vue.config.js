
module.exports = {    
    publicPath:'./',
    assetsDir: 'static',
    devServer:{
        host:'localhost',
        port:8090,
        proxy: {
            '/api':{
                target:'http://localhost:8300',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }            
        }
    }
}