var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var proxyMiddleware = require('http-proxy-middleware');
var path = require('path');
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    inline: true,
    progress: true,
    stats: {
        colors: true,
    }
}));

//代理服务器
app.use('/shopro', proxyMiddleware({
    target: 'http://www.weiyoucrm.com',
    changeOrigin: true,
}))

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

app.listen(8088, function() {
    console.log('正常打开8088端口')
});