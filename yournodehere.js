module.exports = function(RED){
    "use strict"

    function yournodehereNode(config){
        RED.nodes.createNode(this, config);
        this.yournodehere = RED.nodes.getNode(config.yournodehere);
        var node = this;
        //console.log(config);
        node.on('input', function(msg){

            node.on('input', function(msg){

            
                msg.payload = "Something here"
                node.send(msg)
            });
        });
    }
    RED.nodes.registerType("yournodehere", yournodehereNode);



    function yournodehereCredentials(n){
        RED.nodes.createNode(this, n);
        this.username = n.username || this.credentials.username;
        this.password = n.password || this.credentials.password;
        this.client = new yournodehere.yournodehereCareClient();
        if (this.username && this.password){
            this.log("We have a username and password, attempting to authenticiate.")
            try{
                this.client.authenticate(this.username, this.password);
                this.status({fill:"green",shape:"dot",text:"Connected."});
            } catch (err){
                this.status({fill:"red",shape:"ring",text:err});
            }
           
        }
    }
    RED.nodes.registerType("yournodehere-credentials",yournodehereCredentials,{
        credentials: {
            username: {type:"text"},
            password: {type:"password"}
        }
    });
}
