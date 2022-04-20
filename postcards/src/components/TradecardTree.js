class TradecardTreeNode{
    constructor(location, value, parent = null, up = null, down = null, left = null, right=null){
        this.location = location;
        this.value = value;
        this.children = [up,down,left,right]
        this.parent = parent;
    }
    setUp(up){
        this.children[0] = up;
    }
    setDown(down){
        this.children[1] = down;
    }
    setLeft(left){
        this.children[2] = left;
    }
    setRight(right){
        this.children[3] = right;
    }
}
class TradeCardTree{
    constructor(jsonTree){
        this.parse(jsonTree);
    }
    parse(jsonTree){
        this.root = new TradecardTreeNode({x:0,y:0}, jsonTree.value);
        this.parseHelper({x:0,y:0}, this.root, jsonTree)
    }
    parseHelper(location, node, jsonTree){
        if(jsonTree.up !== undefined){
            node.setUp(this.parseHelper(
                {x:location.x,y:(location.y+1)},
                new TradecardTreeNode({x:location.x,y:(location.y+1)},jsonTree.up.value,node),
                jsonTree.up));
        }
        if(jsonTree.down !== undefined){
            node.setDown(this.parseHelper(
            {x:location.x,y:(location.y-1)},
            new TradecardTreeNode({x:location.x,y:(location.y-1)},jsonTree.down.value,node),
            jsonTree.down));
        }
        if(jsonTree.left !== undefined){
            node.setLeft(this.parseHelper({x:(location.x-1),y:location.y},
            new TradecardTreeNode({x:(location.x-1),y:location.y},jsonTree.left.value,node),
            jsonTree.left));
        }
        if(jsonTree.right !== undefined){
            node.setRight(this.parseHelper({x:(location.x+1),y:location.y},
            new TradecardTreeNode({x:(location.x+1),y:location.y},jsonTree.right.value,node),
            jsonTree.right));
        }
        return node;
    }
    preOrderTraversal(node = this.root) {
        if(node === null){
            return;
        }
        if (node.children.length) {
          for (let child of node.children) {
            this.preOrderTraversal(child);
          }
        }
    }
    findEndsFromCenter(){
        return this.findEndsFromCenterHelper(this.node);
    }
    findEndsFromCenterHelper(node = this.root){
        if(node === null){
            return [0,0,0,0];
        }
        let result = convertXYToDirectionArray(node)
        let childrenXYDir = node.children.map((x)=>this.findEndsFromCenterHelper(x));
        for(let i = 0; i < 4; i++){
            result[i] = Math.max(result[i],
                childrenXYDir[0][i],
                childrenXYDir[1][i],
                childrenXYDir[2][i],
                childrenXYDir[3][i])
        }
        return result;        
    }
    locationSearch(x,y){
        return this.locationSearchHelper(this.root,x,y)
    }
    locationSearchHelper(node,x,y){
        if(node.location.x === x && node.location.y === y)
            return node;
        return node.children.filter((z)=> z!==null).map((child)=>this.locationSearchHelper(child,x,y)).find((z)=> z!==undefined)
    }
    *postOrderTraversal(node = this.root) {
        if (node.children.length) {
            for (let child of node.children) {
                if(child !== null)
                    yield* this.postOrderTraversal(child);
            }
        }
        yield node;
  }
}
function convertXYToDirectionArray(node){
    let result = [0,0,0,0]
    if(node===null){
        return result;
    }
    if(node.location.y > 0){
        result[0] = node.location.y;
    }
    else{
        result[1] = (-1)*node.location.y
    }
    if(node.location.x > 0){
        result[3] = node.location.x; //If x positive then go right side
    }
    else{
        result[2] = (-1)*node.location.x;
    }
    return result;
}
export default TradeCardTree;
let test = new TradeCardTree({
    value:"Root",
    up:{
        value:"Up1",
        right:{
            value:"Up1Right1",
        }
    },
    down:{
       value:"Down1",
       down:{
        value:"Down2",
        left: {
            value:"Down2Left1",
        },
        right:{
            value:"Down2Right1",
            right:{
                value:"Down2Right2"
            }
        }
       }, 
    },
    left:{
        value:"Left1",
        up:{
            value:"Left1Up1",
            right:{
                value:"Left1Up1Right1",
            }
        },
    },
    right:{
        value:"Right1",
    }
})