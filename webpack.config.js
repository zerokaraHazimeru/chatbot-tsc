const path = require('path');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
    mode:'development', //開発モード: バンドルしてまとめたファイルが見やすい形式(複数行)で表示される。(本番モードだったら1行)

    entry: './src/main.ts', //バンドルを開始する起点となるファイル。ここから芋づる式にimport文をさかのぼってまとめ上げていく。
    //loaderの設定
    module:{
        rules:[
            {
                test: /\.ts$/,
                use:[
                    {loader: 'babel-loader'},
                    {loader: 'ts-loader'}
                ],
                exclude: /node_modules/
            }
        ]
    },
    //出力ファイル
    output:{
        filename:'bundle.js',
        path:outputPath
    },
    //モジュール解決の時の設定
   resolve: {
        extensions: [
            '.js','.ts'
        ],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },

    //dev-serverの設定
    devServer:{
        contentBase: outputPath,
        watchContentBase:true
    }

}

