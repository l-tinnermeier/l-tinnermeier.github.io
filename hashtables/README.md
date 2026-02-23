# Hash Tables

This folder contains implementations and explanations of hash table data structures.

## Contents

- **Implementation examples** - Various hash table implementations in different programming languages
- **Collision handling** - Techniques for resolving hash collisions (chaining, open addressing, etc.)
- **Performance analysis** - Time complexity and space efficiency comparisons
- **Use cases** - Real-world applications and when to use hash tables

## Key Topics

- Hash functions
- Load factors
- Resizing and rehashing
- Common operations: insert, delete, lookup

Explore the individual files to learn more about how hash tables work and how to use them effectively.

(1) Describe your chosen collision strategy. (2) Explain your hash function. (3) Discuss runtime complexity (best/average/worst). (4) Briefly mention any known limitations or bugs. (5) Acknowledge any AI help used. (6) A brief user manual.

1. For this project, I went with the classic chaining method because I wanted to see how hard it would be to implement a linked list in a language that has no concepts of links or lists. Spoiler, it was hard.
2. The hash function was extremely simple, all it did was add the character values of the string up and modulo them with the current size of the hash table. This was perhaps the hardest part to work out, as the rehashing function proved to be a nightmare.
3. As with most hash tables, all operations are Θ(1) time, exlcuding my rehashing function as the best idea I could come up with was simply gathering every element in the hash table and plopping it into a wiped version of the table, so Θ(n) time. Also, there is the edge case where, for traversing the linked lists, the node I wish to find is at the end of a chain the length of the table itself, which is also Θ(n)
4. I'm pretty sure this code (the hash table stuff itself *not* the bookshelf stuff) is relatively stable, I used ChatGPT to try to break it and it found some bugs initally but in its current state it said it was fine.
5. As stated in the video, no AI was used making the actual hash table itself (miraculously), and while I did use a hefty amount of Google I tried to scroll past the AI response and look at actual websites whenever possible. However, AI was used to debug the program, as well as trying to get the book shelves to work last minute (which didn't work out so well...)


### User Manual
- Enter an initial size of your hash table when prompted!
- Your hash table will automatically resize whenever it is at 75% capacity, so don't worry about running out of space!
- Simply navigate down to the bottom of the webpage to add, delete, or search for a node!
- Every time you update the table, it will redisplay on the screen!
- If you wish to see what each function is doing, open up the INSPECT menu, and debug statements will be printing saying where you are!