### hexo-fetch-nem

This is a hexo plugin which is used to fetch contents from nem blockchain and read the message and try to render them.

Your contents to read should be in markdown with the default that the first line is the title.

For example.

```
### My title

* foo
* bar
```

Run `npm install hexo-fetch-nem  --save`
and  add your target nem address to read from in the `_config.yml`.

Also, the default is fread from testnet, so you may like to change to mainnet.


```yml
isMainnet: true
address: your_nem_address
```

