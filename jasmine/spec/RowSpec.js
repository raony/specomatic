define(['Table', 'BaseRow'], function(Table, BaseRow) {
    describe("Row", function() {
        var row;
        var table;

        beforeEach(function() {
            table = new Table();
            var header = table.addrow('');
            row = table.addrow('');
        });

        it("behaves as a BaseRow", function () {
            expect(row instanceof BaseRow).toBeTruthy();
        });

        it("don't create cell on next at the end", function () {
            var cell = row.newstep(0, '');
            row.select(cell);
            row.next();
            expect(row.length()).toBe(1);
            expect(row.selected()).toBe(cell);
        });
        
        it("don't create cell on previous at the beginning", function () {
            var cell = row.newstep(0, '');
            row.select(cell);
            row.previous();
            expect(row.length()).toBe(1);
            expect(row.selected()).toBe(cell);
        });
        
        it("don't create cell on insert next", function () {
            var second = row.newstep(0, 'asd');
            var first = row.newstep(0, 'asd');
            row.select(first);
            row.next(true);
            expect(row.length()).toBe(2);
            expect(row.selected()).toBe(second);
        });
        
        it("don't create cell on insert previous", function () {
            var second = row.newstep(0, 'asd');
            var first = row.newstep(0, 'asd');
            row.select(second);
            row.previous(true);
            expect(row.length()).toBe(2);
            expect(row.selected()).toBe(first);
        });

        it("don't remove empty cell", function () {
            var second = row.newstep(0, '');
            var first = row.newstep(0, '');
            row.select(second);
            row.select(first);
            expect(row.length()).toBe(2);
            expect(row.selected()).toBe(first);
        });
    });
});
