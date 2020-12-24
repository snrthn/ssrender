const express = require('express');

const server = express();

const { createBundleRenderer } = require('vue-server-renderer');

const path = require('path');

const fs = require('fs');

const serverBundle = require(path.resolve(__dirname, './dist/vue-ssr-server-bundle.json'));

const clientManifest = require(path.resolve(__dirname, './dist/vue-ssr-client-manifest.json'));

const template = fs.readFileSync(path.resolve(__dirname, './dist/index.ssr.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
    template: template,
    clientManifest: clientManifest
});

server.get('*', (req, res) => {
    if (req.url !== '/favicon.ico') {
        const context = {url: req.url};
        const ssrStream = renderer.renderToStream(context);
        let buffers = [];
        ssrStream.on('data', (data) => {
            buffers.push(data);
        })
        ssrStream.on('end', () => {
            res.end(Buffer.concat(buffers))
        })
    }
});

server.listen(1120, () => {
    console.log('成功起飞！')
});