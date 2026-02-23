class Node {
    constructor(key, value) {
        if (typeof key != "string") {
            throw new Error(`Invalid parameter: "${key}" is not of type String`);
        } else {
            this.key = key;
        }

        if (typeof value != "number") {
            throw new Error(`Invalid parameter: "${value}" is not of type Number`);
        } else {
            this.value = value;
        }

        this.next = null;
    }

    setNextNode(node) {
        if (node instanceof Node) {
            this.next = node;
        } else {
            throw new Error(`Invalid parameter: "${node}" is not of type Node`);
        }
    }

    getNextNode() {
        if (this.next != null) {
            return this.next;
        } else {
            return null;
        }
    }


}

class HashTable {
    constructor(initialSize) {
        if (typeof initialSize != "number") {
            throw new Error(`Invalid parameter: "${initialSize}" is not of type Number`);
        } else {
            this.table = new Array(initialSize);
            this.size = initialSize;
            this.elements = 0;
        }
    }

    growTable() {
        if (Math.floor(this.size * 0.75) <= (this.elements + 1)) {
            this.size *= 2;
            this.table.length = this.size;
        }
    }
    getTable() {
        return this.table;
    }

    hashNode(key) {
        if (typeof key != "string") {
            throw new Error(`Invalid parameter: "${key}" is not of type String`);
        } else {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }

            return hash % this.size;
        }
    }

    addNode(node) {
        if (node instanceof Node) {
            this.growTable();

            let index = this.hashNode(node.key);
            if (this.table[index] == null) {
                this.table[index] = node;
            } else {
                let traverserNode = this.table[index];
                while (traverserNode.getNextNode() != null) {
                    traverserNode = traverserNode.getNextNode();
                }
                traverserNode.setNextNode(node);
            }

            this.elements++;
        } else {
            throw new Error(`Invalid parameter: "${node}" is not of type Node`);
        }
    }

    getNode(key) {
        if (typeof key != "string") {
            throw new Error(`Invalid parameter: "${key}" is not of type String`);
        } else {
            let index = this.hashNode(key);
            if (this.table[index] != null) {
                if (this.table[index].getNextNode() == null) {
                    return this.table[index];
                } else {
                    let traverserNode = this.table[index];
                    while (traverserNode.getNextNode() != null && traverserNode.key != key) {
                        traverserNode = traverserNode.getNextNode();
                    }
                    return traverserNode;
                }
            } else {
                console.log(`No node found with the key of: "${key}"`);
                return null;
            }
        }
    }
}

let hashTable = new HashTable(11);

for (let i = 0; i < 100; i++) {
    hashTable.addNode(new Node(`item ${i}`, i * i));
}

console.log(hashTable);
console.log(Math.floor(11 * 0.75));
console.log(hashTable.getNode("item 88"));