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

    rehashTable() {
        let placeholderTable = new Array();
        for (let i = 0; i < this.size; i++) {
            if (this.table[i] != null) {
                if (this.table[i].getNextNode() == null) {
                    placeholderTable.push(this.table[i]);
                } else {
                    let placeholderNode = this.table[i];
                    while (placeholderNode != null) {
                        const nextNode = placeholderNode.getNextNode();
                        placeholderNode.next = null;
                        placeholderTable.push(placeholderNode);
                        placeholderNode = nextNode;
                    }
                }
            }
        }

        console.log("[reshashTable] Rehashing table with nodes:");
        console.log(placeholderTable);

        this.size *= 2;
        this.table = new Array(this.size);
        this.elements = 0;
        
        for (let i = 0; i < placeholderTable.length; i++) {
            this.addNode(placeholderTable[i]);
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

            if (this.elements / this.size >= 0.75) {
                console.log("[addNode] Load factor of 0.75 reached, growing table...");
                this.rehashTable();
            }

            console.log("[addNode] Attempting to add node with key: " + node.key); 

            let index = this.hashNode(node.key);
            console.log(`   Node with key: "${node.key}" has a hash of: ${index} with a table size of: ${this.size}`);
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

    deleteNode(key) {
        if (typeof key != "string") {
            throw new Error(`Invalid parameter: ${key} is not of type String`);
        } else {
            let index = this.hashNode(key);
            if (this.table[index] != null) {
                if (this.table[index].getNextNode() == null) {
                    if (this.table[index].key != key) {
                        console.log(`No node found to delete with the key of: "${key}"`);
                        return null;
                    } else {
                        this.table[index] = null;
                        this.elements--;
                    }
                } else {
                    let traverserNode = this.table[index];
                    let previousNode = traverserNode;
                    while (traverserNode.getNextNode() != null && traverserNode.key != key) {
                        previousNode = traverserNode;
                        traverserNode = traverserNode.getNextNode();
                    }

                    if (traverserNode.key == key) {
                        if (previousNode == traverserNode) {
                                this.table[index] = traverserNode.getNextNode();
                        } else {
                            previousNode.setNextNode(traverserNode.getNextNode());
                        }
                        traverserNode = null; 
                        this.elements--;
                    } else {
                        console.log(`No node found to delete with the key of: "${key}"`);
                        return null;
                    }
                }
            } else {
                console.log(`No node found to delete with the key of: "${key}"`);
                return null;
            }
        }
    }

    getNode(key) {
        if (typeof key != "string") {
            throw new Error(`Invalid parameter: "${key}" is not of type String`);
        } else {
            let index = this.hashNode(key);
            if (this.table[index] != null) {
                if (this.table[index].getNextNode() == null) {
                    if (this.table[index].key != key) {
                        console.log(`No node found with the key of: "${key}"`);
                        return null;
                    } else {
                        return this.table[index];
                    }
                } else {
                    let traverserNode = this.table[index];
                    while (traverserNode.getNextNode() != null && traverserNode.key != key) {
                        traverserNode = traverserNode.getNextNode();
                    }

                    if (traverserNode.key == key) {
                        return traverserNode;
                    } else {
                        console.log(`No node found with the key of: "${key}"`);
                        return null;
                    }
                }
            } else {
                console.log(`No node found with the key of: "${key}"`);
                return null;
            }
        }
    }
}

let hashTable = new HashTable(11);
let tableSize = 440;

for (let i = 0; i < tableSize; i++) {
    hashTable.addNode(new Node(`item ${i}`, i * i));
}

console.log(hashTable.getTable());

for (let i = 0; i < tableSize; i++) {
    console.log(hashTable.getNode(`item ${i}`));
}

console.log(hashTable.getTable());
