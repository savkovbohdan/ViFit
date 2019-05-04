"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_array_1 = require("tns-core-modules/data/observable-array");
var observable_1 = require("tns-core-modules/data/observable");
var ViewModel = /** @class */ (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        var _this = _super.call(this) || this;
        _this.templateSelectorFunction = function (item, index, items) {
            return item.type;
        };
        _this.dataItems = new observable_array_1.ObservableArray();
        _this._templateSelector = _this.templateSelectorFunction;
        var itemsCount = 50;
        for (var i = 0; i <= itemsCount; i++) {
            _this.dataItems.push(new DataItem(i, "Item " + i, "This is item description", _this.getType(i, itemsCount)));
        }
        return _this;
    }
    Object.defineProperty(ViewModel.prototype, "myGroupingFunc", {
        get: function () {
            return function (item) {
                return item.type;
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "dataItems", {
        get: function () {
            return this.get("_dataItems");
        },
        set: function (value) {
            this.set("_dataItems", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "_templateSelector", {
        get: function () {
            return this.get("templateSelector");
        },
        set: function (value) {
            this.set("templateSelector", value);
        },
        enumerable: true,
        configurable: true
    });
    ViewModel.prototype.getType = function (index, end) {
        var lastDigit = index % 10;
        var type = index === 0 ? "first" : index === end ? "last" : undefined;
        if (!type) {
            type = lastDigit === 0 ? "default" : lastDigit <= 3 ? "red" : lastDigit <= 6 ? "blue" : lastDigit <= 9 ? "green" : "default";
        }
        return type;
    };
    return ViewModel;
}(observable_1.Observable));
exports.ViewModel = ViewModel;
var DataItem = /** @class */ (function () {
    function DataItem(id, name, description, type) {
        this.type = type;
        this.id = id;
        this.itemName = name;
        this.itemDescription = description;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyRUFBeUU7QUFDekUsK0RBQThEO0FBRTlEO0lBQStCLDZCQUFVO0lBRXJDO1FBQUEsWUFDSSxpQkFBTyxTQU9WO1FBd0JNLDhCQUF3QixHQUFHLFVBQUMsSUFBYyxFQUFFLEtBQWEsRUFBRSxLQUFVO1lBQ3hFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDLENBQUE7UUFoQ0csS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGtDQUFlLEVBQVksQ0FBQztRQUNqRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLHdCQUF3QixDQUFDO1FBQ3ZELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLDBCQUEwQixFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5Rzs7SUFDTCxDQUFDO0lBRUQsc0JBQUkscUNBQWM7YUFBbEI7WUFDSSxPQUFPLFVBQUMsSUFBYztnQkFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JCLENBQUMsQ0FBQztRQUNOLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0NBQVM7YUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsQyxDQUFDO2FBRUQsVUFBYyxLQUFnQztZQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLHdDQUFpQjthQUFyQjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7YUFFRCxVQUFzQixLQUE0RDtZQUM5RSxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUM7OztPQUpBO0lBVU8sMkJBQU8sR0FBZixVQUFnQixLQUFhLEVBQUUsR0FBVztRQUN0QyxJQUFJLFNBQVMsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDdEUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksR0FBRyxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztTQUNoSTtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUEvQ0QsQ0FBK0IsdUJBQVUsR0ErQ3hDO0FBL0NZLDhCQUFTO0FBaUR0QjtJQUtJLGtCQUFZLEVBQVUsRUFBRSxJQUFZLEVBQUUsV0FBbUIsRUFBUyxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUMxRSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmRhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8RGF0YUl0ZW0+KCk7XHJcbiAgICAgICAgdGhpcy5fdGVtcGxhdGVTZWxlY3RvciA9IHRoaXMudGVtcGxhdGVTZWxlY3RvckZ1bmN0aW9uO1xyXG4gICAgICAgIGxldCBpdGVtc0NvdW50ID0gNTA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gaXRlbXNDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUl0ZW1zLnB1c2gobmV3IERhdGFJdGVtKGksIFwiSXRlbSBcIiArIGksIFwiVGhpcyBpcyBpdGVtIGRlc2NyaXB0aW9uXCIsIHRoaXMuZ2V0VHlwZShpLCBpdGVtc0NvdW50KSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXlHcm91cGluZ0Z1bmMoKTogKGl0ZW06IGFueSkgPT4gYW55IHtcclxuICAgICAgICByZXR1cm4gKGl0ZW06IERhdGFJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGU7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxEYXRhSXRlbT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldChcIl9kYXRhSXRlbXNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGFJdGVtcyh2YWx1ZTogT2JzZXJ2YWJsZUFycmF5PERhdGFJdGVtPikge1xyXG4gICAgICAgIHRoaXMuc2V0KFwiX2RhdGFJdGVtc1wiLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IF90ZW1wbGF0ZVNlbGVjdG9yKCk6IChpdGVtOiBEYXRhSXRlbSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSkgPT4gc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoXCJ0ZW1wbGF0ZVNlbGVjdG9yXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBfdGVtcGxhdGVTZWxlY3Rvcih2YWx1ZTogKGl0ZW06IERhdGFJdGVtLCBpbmRleDogbnVtYmVyLCBpdGVtczogYW55KSA9PiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldChcInRlbXBsYXRlU2VsZWN0b3JcIiwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0ZW1wbGF0ZVNlbGVjdG9yRnVuY3Rpb24gPSAoaXRlbTogRGF0YUl0ZW0sIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gaXRlbS50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VHlwZShpbmRleDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGxhc3REaWdpdCA9IGluZGV4ICUgMTA7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBpbmRleCA9PT0gMCA/IFwiZmlyc3RcIiA6IGluZGV4ID09PSBlbmQgPyBcImxhc3RcIiA6IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoIXR5cGUpIHtcclxuICAgICAgICAgICAgdHlwZSA9IGxhc3REaWdpdCA9PT0gMCA/IFwiZGVmYXVsdFwiIDogbGFzdERpZ2l0IDw9IDMgPyBcInJlZFwiIDogbGFzdERpZ2l0IDw9IDYgPyBcImJsdWVcIiA6IGxhc3REaWdpdCA8PSA5ID8gXCJncmVlblwiIDogXCJkZWZhdWx0XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFJdGVtIHtcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gICAgcHVibGljIGl0ZW1OYW1lO1xyXG4gICAgcHVibGljIGl0ZW1EZXNjcmlwdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHB1YmxpYyB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5pdGVtTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5pdGVtRGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxufSJdfQ==