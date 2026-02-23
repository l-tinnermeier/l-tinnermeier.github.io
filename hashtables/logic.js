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
            this.initialSize = initialSize;
            this.elements = 0;
            this.resizes = 0;
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
                this.resizes++;
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

const hashTableContentsDisp = document.getElementById("hashTableContentsDisp");
const shelfs = document.getElementsByClassName("shelf");

let hashTable;
let tableSize;

function initializeHashTable(size) {
    if (typeof size != "number") {
        throw new Error(`Invalid parameter: "${size}" is not of type Number`);
    } else {
        tableSize = size;
        hashTable = new HashTable(tableSize);
    }
}
function displayHashTable() {

    shelfContainer.innerHTML = "";
    for (let i = 0; i < (hashTable.resizes + 1); i++) {
        let newShelf = document.createElement("section");
        newShelf.classList.add("shelf");
        shelfContainer.appendChild(newShelf);
    }
    
    for (let i = 0; i < shelfs.length; i++) {
        shelfs[i].innerHTML = "";
    }


    let shelfIndex = 0;

    hashTableContentsDisp.innerHTML = "";
    for (let i = 0; i < hashTable.getTable().length; i++) {

        shelfIndex = Math.floor(i / hashTable.initialSize);

        if (hashTable.getTable()[i] != null) {
            let newElement = document.createElement("div");
            // <div class="book">
            //     <span class="spine-text">Data Structures Reference</span>
            // </div>
            let newBook = document.createElement("div");
            newBook.classList.add("book");
            let spineText = document.createElement("span");
            spineText.classList.add("spine-text");

            if (hashTable.getTable()[i].getNextNode() != null) {
                let chainLength = 0;
                let placeholderNode = hashTable.getTable()[i];
                while (placeholderNode != null) {
                    let newElementChild = document.createElement("div");
                    newElementChild.innerHTML = `<p>${i}.${chainLength}: ${placeholderNode.key}, ${placeholderNode.value}</p>`;
                    newElement.appendChild(newElementChild);
                    placeholderNode = placeholderNode.getNextNode();


                    let newBookChild = document.createElement("div");
                    newBookChild.classList.add("book");
                    let spineText = document.createElement("span");
                    spineText.classList.add("spine-text");
                    spineText.innerText = hashTable.getTable()[i].key + (chainLength > 0 ? ` vol. ${chainLength})` : "");
                    newBookChild.appendChild(spineText);
                    shelfs[shelfIndex].appendChild(newBookChild);

                    chainLength++;

                }
            } else {
                newElement.innerHTML = `<p>${i}: ${hashTable.getTable()[i].key}, ${hashTable.getTable()[i].value}</p>`;
                spineText.innerText = hashTable.getTable()[i].key;
                newBook.appendChild(spineText);
                shelfs[shelfIndex].appendChild(newBook);
            }
            hashTableContentsDisp.appendChild(newElement);
            hashTableContentsDisp.appendChild(document.createElement("br"));
        }
    }

    resizeBooks();
}

function addToHashTable() {
    let userInput = prompt("Enter a key to add to the hash table:");
    if (userInput != null) {
        let valueInput = prompt("Enter a value to add to the hash table:");
        if (valueInput != null) {
            hashTable.addNode(new Node(userInput, parseInt(valueInput)));
            displayHashTable();
        }
    }
}

function deleteFromHashTable() {
    let userInput = prompt("Enter a key to delete from the hash table:");
    if (userInput != null) {
        let node = hashTable.getNode(userInput);
        if (node == null) {
            alert(`No node found with the key of: "${userInput}"`);
            return;
        } else {
            hashTable.deleteNode(userInput);
            displayHashTable();
        }
    }
}

function searchHashTable() {
    let userInput = prompt("Enter a key to search for in the hash table:");
    if (userInput != null) {
        let node = hashTable.getNode(userInput);
        if (node != null) {
            alert(`Node found with key: "${node.key}" and value: ${node.value}`);
        } else {
            alert(`No node found with the key of: "${userInput}"`);
        }
    }
}

function fillTableWithDummyData() {
    for (let i = 0; i < tableSize * 2; i++) {
        let grade = Math.floor(Math.random() * 101);
        hashTable.addNode(new Node(`Book ${i + 1}`, grade));
    }
    displayHashTable();
}

function displayHashTableSize() {
    alert(`Current hash table size: ${hashTable.size}. It has been resized ${hashTable.resizes} times.`);
}

function resizeBooks() {
const minHeight = 140;
    const maxHeight = 320;
    const heightPerChar = 4;
    const baseWidth = 48;
    const maxWidth = 96;
    const widthPerChar = 1.6;

    document.querySelectorAll(".book").forEach((book, index) => {
        const spineText = book.querySelector(".spine-text");
        if (!spineText) {
            return;
        }

        const textLength = spineText.textContent.trim().length || 1;
        const tentativeHeight = minHeight + textLength * heightPerChar;
        const clampedHeight = Math.max(minHeight, Math.min(maxHeight, tentativeHeight));
        book.style.height = `${clampedHeight}px`;

        const widthAdjustment = Math.max(0, textLength - 12) * widthPerChar;
        const tentativeWidth = baseWidth + widthAdjustment;
        const clampedWidth = Math.min(maxWidth, tentativeWidth);
        book.style.width = `${clampedWidth}px`;
        book.style.setProperty("--book-delay", `${index * 150}ms`);
    });
}

Window.onload = initalizePage();
function initalizePage() {
    let intialSizeInput = prompt("Enter an initial size for the hash table:");
    if (intialSizeInput != null) {
        initializeHashTable(parseInt(intialSizeInput));
    }
}
