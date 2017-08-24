var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./../../src/decorators/JsonProperty", "./../../src/classes/Serializable"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonProperty_1 = require("./../../src/decorators/JsonProperty");
    var Serializable_1 = require("./../../src/classes/Serializable");
    var Friend = (function (_super) {
        __extends(Friend, _super);
        function Friend() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            JsonProperty_1.jsonProperty(Number),
            __metadata("design:type", Number)
        ], Friend.prototype, "id", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], Friend.prototype, "name", void 0);
        return Friend;
    }(Serializable_1.Serializable));
    exports.Friend = Friend;
    var User = (function (_super) {
        __extends(User, _super);
        function User() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._id = "";
            _this.index = 0;
            _this.guid = "";
            _this.isActive = false;
            _this.balance = "";
            _this.picture = "";
            _this.age = 0;
            _this.eyeColor = "";
            _this.name = "";
            _this.gender = "";
            _this.company = "";
            _this.email = "";
            _this.phone = "";
            _this.address = "";
            _this.about = "";
            _this.registered = "";
            _this.latitude = 0;
            _this.longitude = 0;
            _this.tags = [];
            _this.friends = [];
            _this.greeting = "";
            _this.favoriteFruit = "";
            return _this;
        }
        __decorate([
            JsonProperty_1.jsonProperty(String, void 0, null),
            __metadata("design:type", String)
        ], User.prototype, "_id", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(Number),
            __metadata("design:type", Number)
        ], User.prototype, "index", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "guid", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(Boolean),
            __metadata("design:type", Boolean)
        ], User.prototype, "isActive", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "balance", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "picture", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(Number),
            __metadata("design:type", Number)
        ], User.prototype, "age", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "eyeColor", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "name", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "gender", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "company", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "email", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "phone", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "address", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "about", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "registered", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(Number),
            __metadata("design:type", Number)
        ], User.prototype, "latitude", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(Number),
            __metadata("design:type", Number)
        ], User.prototype, "longitude", void 0);
        __decorate([
            JsonProperty_1.jsonProperty([String]),
            __metadata("design:type", Array)
        ], User.prototype, "tags", void 0);
        __decorate([
            JsonProperty_1.jsonProperty([Friend]),
            __metadata("design:type", Array)
        ], User.prototype, "friends", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "greeting", void 0);
        __decorate([
            JsonProperty_1.jsonProperty(String),
            __metadata("design:type", String)
        ], User.prototype, "favoriteFruit", void 0);
        return User;
    }(Serializable_1.Serializable));
    exports.User = User;
});
