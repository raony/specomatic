define(['BaseRow', 'ProtoList', 'TabCell'], function(BaseRow, ProtoList, TabCell) {
    describe("BaseRow", function() {
        var row;

        beforeEach(function() {
            row = new BaseRow();
        });

        it("when instatiated with a number, create that number of columns", function() {
            var row = new BaseRow(null, 8);
            expect(row.length()).toBe(8);
        });

        it("when instatiated with an array, create a column for each element in order", function() {
            var row = new BaseRow(null, ['cell1', 'cell2', 'cell3']);
            expect(row.length()).toBe(3);
            expect(row.elementAt(0).value()).toBe('cell1');
            expect(row.elementAt(1).value()).toBe('cell2');
            expect(row.elementAt(2).value()).toBe('cell3');
        });

        it("behaves as a ProtoList", function () {
            expect(row instanceof ProtoList).toBeTruthy();
        });

        it("creates a TabCell as new step", function () {
            var cell = row.newstep(0, 'first cell');

            expect(cell instanceof TabCell).toBeTruthy();
            expect(row.elementAt(0)).toBe(cell);
            expect(cell.value()).toBe('first cell');
        });

        it("is empty if has no cells", function () {
            expect(row.length()).toBe(0);
            expect(row.isempty()).toBeTruthy();
        });
        
        it("is empty if has all cells empty", function () {
            var last = row.newstep(0, 'asd');
            var middle = row.newstep(0, 'asd');
            var first = row.newstep(0, 'asd');
            last.value('');
            middle.value('');
            first.value('');
            expect(row.length()).toBe(3);
            expect(row.isempty()).toBeTruthy();
        });
        
        it("is not empty if has at least one cell not empty", function () {
            row.newstep(0, 'asd');
            row.newstep(0, 'asd');
            row.newstep(0, 'asd');
            row.newstep(0, '1');
            row.newstep(0, 'asd');
            expect(row.length()).toBe(5);
            expect(row.isempty()).toBeFalsy();
        });

        it("selects first cell when started editing", function () {
            cell = row.newstep(0, 'asd');
            row.startediting();
            expect(cell.isediting()).toBeTruthy();
        });

        it("selects choosed cell when started editing at a specific position", function () {
            cell = row.newstep(0, 'asd');
            row.deselect(row.newstep(0, 'asd'));
            row.startediting(1);
            expect(cell.isediting()).toBeTruthy();
        });
    });
});
