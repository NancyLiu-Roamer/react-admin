export default function listToTreeWithLevel(list, parent) {
    var out = []
    for (var node of list) {  
            if (node.cat_pid == parent) {
                var children = listToTreeWithLevel(list, node.cat_id)
                if (children.length) {
                    node.children = children
                }
                out.push(node)
            }
    }
    return out
}