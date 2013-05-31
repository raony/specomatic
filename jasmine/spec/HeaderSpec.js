define(['Table', 'BaseRow', 'Header'], function(Table, BaseRow, Header) {
    describe("Header", function() {
        var header;
        var table;
        var row;

        beforeEach(function() {
            table = new Table();
            header = table.newstep(0, 'cell1');
            row = table.newstep(1, 'cell2');
        });

        it("behaves as a BaseRow", function () {
            expect(header instanceof BaseRow).toBeTruthy();
            expect(header instanceof Header).toBeTruthy();
        });

        it("when create a newstep, create at the rows too", function () {
            header.newstep(0, 'sad');
            header.newstep(0, 'asd');
            expect(row.length()).toBe(3);
        });
        
        it("when remove a step, remove at the rows too", function () {
            header.newstep(0, 'asd');
            var middle = header.newstep(0, 'asd');
            header.newstep(0, 'asd');

            var first = row.elementAt(0);
            var last = row.elementAt(2);
            expect(row.length()).toBe(4);
            header.remove(middle);
            expect(row.length()).toBe(3);
            expect(row.elementAt(0)).toBe(first);
            expect(row.elementAt(1)).toBe(last);
        });

        it("when remove a step, and is the last one, remove the rows", function () {
            var row2 = table.newstep(2, 'cell3');
            expect(table.length()).toBe(3);
            
            var only = header.elementAt(0);
            header.select(only);
            only.value('');
            header.blur(only);

            expect(table.length()).toBe(0);
        });


    });
});
