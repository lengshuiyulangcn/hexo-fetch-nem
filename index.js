const nem = require("nem-sdk").default
const config = hexo.config
const address = config.nem_address || "TAYFYAEQEV7URQSZZ3J3TRT3N6EYW2PEXTMWLL67"
const MainNet = config.isMainnet || false
const fs = require("hexo-fs")
const path = require("path")

hexo.extend.filter.register("after_init", function(){
  let network = MainNet ? nem.model.nodes.defaultMainnet : nem.model.nodes.defaultTestnet
  let normal_endpoint = nem.model.objects.create("endpoint")(network, nem.model.nodes.defaultPort)
  nem.com.requests.account.transactions.incoming(normal_endpoint, address).then((res) => {
    res.data.map(( d )=>{
      if(d.transaction.message.payload){
        var timeStamp = (new Date(d.transaction.timeStamp * 1000 + Date.UTC(2015, 2, 29, 0, 6, 25, 0))).toISOString()
        timeStamp = timeStamp.replace("T", " ").replace(".000Z", " ")
        var data = nem.utils.format.hexToUtf8( d.transaction.message.payload )
        var title = data.split("\n")[0].replace(/#/g, "")
        data = data.split("\n").slice(1,-1).join("\n")
        data = "---\n"+ "title: "+ title + "\n"  +"date: " + timeStamp + "\n" + "tags: [] \n"  + "---\n\n" + data
        fs.writeFileSync(path.join("source/_posts/", d.meta.hash.data + ".md"), data )
      }
    })
  })
})
