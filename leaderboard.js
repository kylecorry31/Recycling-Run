function Leaderboard(name, capacity) {
    this.name = name;
    if (typeof(Storage) !== "undefined") {
        var elements = localStorage.getItem(name);
        // localStorage.setItem("name", true);
        var minHeapCompareFunc = function(a, b) {
            return a.score < b.score;
        };
        this.board = new Heap(minHeapCompareFunc);
        if (elements !== null) {
            this.board.elements = JSON.parse(elements).elements;
        }
    }
    while (this.board.elements.length > this.capacity) {
        this.board.Pop();
    }
    this.capacity = capacity;
}


Leaderboard.prototype.add = function(score) {
    this.board.Push(score);
    if (this.board.elements.length > this.capacity) {
        this.board.Pop();
    }
};

Leaderboard.prototype.getTop10 = function() {
    var elements = this.board.elements;
    var data = [];
    for (var i = 0; i < elements.length; i++) {
        data.push(elements[i]);
    }
    data = data.sort(function(a, b) {
        if(b.score === a.score){
          return a.time - b.time;
        }
        return b.score - a.score;
    });
    return data;
}

Leaderboard.prototype.save = function() {
    localStorage.setItem(this.name, JSON.stringify(this.board));
}
