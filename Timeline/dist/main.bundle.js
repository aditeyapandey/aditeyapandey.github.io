webpackJsonp([2,4],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.url = "../assets/csvjson.json";
        //Every 1000 ms this assigns a new value to this.clock value
        this.clock = __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].interval(1000).map(function (tick) { return new Date(); }).share();
    }
    DataService.prototype.getQuestions = function () {
        return this.http.get(this.url);
    };
    DataService.prototype.getClock = function () {
        //If a function returns an observable, then if the value changes
        return this.clock;
    };
    return DataService;
}());
DataService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]) === "function" && _a || Object])
], DataService);

var _a;
//# sourceMappingURL=data.service.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserResponse; });
/**
 * Created by aditeyapandey on 11/5/18.
 */
var UserResponse = (function () {
    function UserResponse() {
    }
    return UserResponse;
}());

//# sourceMappingURL=userResponse.model.js.map

/***/ }),

/***/ 227:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 227;


/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(237);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_userResponse_model__ = __webpack_require__(107);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
var AppComponent = (function () {
    function AppComponent(data, userResponse) {
        this.data = data;
        this.userResponse = userResponse;
        this.title = 'Timeline Evaluation';
        this.currentQuestionCounter = 0;
        this.totalQuestionCounter = 24;
        this.visWidth = window.screen.width;
        this.visHeight = window.screen.height;
        this.questions = [];
        this.ifInputNotProvided = true;
        this.userInput = "";
        this.imgHome = "../assets/";
        this.imgName = "";
        this.currentQuestion = "";
        this.startTimeFirstTimeDefine = false;
        this.randomizedQuestionOrder = [];
        this.showInstructions = true;
        this.showSurvey = false;
        this.byPassQuestion = false; // Need to set to false before goes into production
        this.testingParameter = false; // if this is true then a hardcoded case will show for testing
        this.userIdentifier = "" + Math.floor(Math.random() * 10000) + 1;
        this.userResponseFinalData = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Step1 : a. Set user demographics information: Set the information about the user upfront, we need user demographics information
        // We might need this for the current evaluation, also needs some thought
        this.userResponseLocalVar = new __WEBPACK_IMPORTED_MODULE_2__models_userResponse_model__["a" /* UserResponse */]();
        //Step 3: Initialize the time for the evaluation, needs to start at the end of instruction
        // this.data.getClock().subscribe(time => {
        //   this.time = time;
        //   if(!this.startTimeFirstTimeDefine){
        //     this.startTime = time;
        //     this.startTimeFirstTimeDefine = true;
        //   }
        // });
        //Step 2: Load the questions from the database
        this.data.getQuestions().subscribe(function (response) {
            _this.questions = response;
            if (_this.testingParameter) {
                _this.randomizedQuestionOrder = [3, 23, 11, 18, 5, 10, 24, 4, 16, 12, 17, 13, 2, 20, 6, 15, 19, 8, 21, 1, 7, 14, 9, 22];
                _this.imgName = "index.png";
            }
            else {
                //Normal Step: Testing the randomization
                _this.randomizedQuestionOrder = _this.testRandomization();
                //Loading Images with randomized order
                _this.imgName = _this.questions[_this.randomizedQuestionOrder[_this.currentQuestionCounter] - 1].file;
            }
            //Question
            _this.currentQuestion = _this.questions[_this.randomizedQuestionOrder[_this.currentQuestionCounter] - 1].question;
            //Data to record at the starting of the evaluation
            _this.userResponseLocalVar.name = _this.userIdentifier;
            // //Step 5: Record the time and also do it when the the survey is initiated
            // this.userResponseLocalVar.time=this.time;
            //Step 6: Store the timelineQuestionId and also do it when the surey is initiated
            _this.userResponseLocalVar.timelineQuestionId = _this.questions[0].id;
        });
    };
    AppComponent.prototype.userInputChange = function () {
        this.ifInputNotProvided = ((this.userInput == "")) ? true : false;
    };
    AppComponent.prototype.loadNextQuestion = function () {
        if (this.currentQuestionCounter < this.totalQuestionCounter - 1) {
            //Step 1: Save data
            this.saveData();
            //Step 2: Clear the input field and reset the inInputNotProvided option
            this.userInput = "";
            this.ifInputNotProvided = ((this.userInput == "")) ? true : false;
            // //Step 3:Change the question
            // this.currentQuestion=this.questions[this.currentQuestionCounter+1].question
            //
            // //Step 4: Change the visualization
            // this.imgName=this.questions[this.currentQuestionCounter+1].file
            //Step 3:Change the question
            this.currentQuestion = this.questions[this.randomizedQuestionOrder[this.currentQuestionCounter + 1] - 1].question;
            //Step 4: Change the visualization
            this.imgName = this.questions[this.randomizedQuestionOrder[this.currentQuestionCounter + 1] - 1].file;
            //Step 5: Change the counter
            this.currentQuestionCounter += 1;
        }
        else {
            // Save the answers for final set of questions
            this.saveData();
            this.downloadData();
            //Test
            console.log(this.userResponseFinalData);
            alert("End of Survey!");
        }
    };
    AppComponent.prototype.saveData = function () {
        //Initializing step
        this.userResponseLocalVar = new __WEBPACK_IMPORTED_MODULE_2__models_userResponse_model__["a" /* UserResponse */]();
        this.userResponseLocalVar.name = this.userIdentifier;
        //Step 1: Record the time and also do it when the the survey is initiated
        this.userResponseLocalVar.endTime = this.time;
        this.userResponseLocalVar.startTime = this.startTime;
        this.startTime = this.time;
        // //Step 2: Record the answer
        this.userResponseLocalVar.response = this.userInput;
        //Step 3: Store the timelineQuestionId and also do it when the surey is initiated
        //this.userResponseLocalVar.timelineQuestionId=this.questions[this.currentQuestionCounter].id
        //Test
        this.userResponseLocalVar.timelineQuestionId = this.questions[this.randomizedQuestionOrder[this.currentQuestionCounter] - 1].id;
        //Step 4: Cross checking the data stored
        console.log(this.userResponseLocalVar);
        this.userResponseFinalData.push(this.userResponseLocalVar);
    };
    AppComponent.prototype.downloadData = function () {
        //Code copied from StackOverflow
        var theJSON = JSON.stringify(this.userResponseFinalData);
        var uri = "data:application/json;filename=filename.json,charset=UTF-8" + encodeURIComponent(theJSON);
        var a = document.createElement('a');
        a.href = uri;
        a.innerHTML = "Right-click and choose 'save as...'";
        document.body.appendChild(a);
    };
    AppComponent.prototype.testRandomization = function () {
        var localCounter = 0;
        var counterExceeded = false;
        var firstNumber = Math.ceil(Math.random() * Math.floor(24));
        var arrIndex = [firstNumber];
        var indexUsed = [firstNumber];
        for (var i = 1; i < 24; i++) {
            var checkCondition = true;
            while (checkCondition) {
                localCounter += 1;
                if (localCounter > 1000) {
                    counterExceeded = true;
                    break;
                }
                console.log(localCounter + 1);
                var randomIndex = Math.ceil(Math.random() * Math.floor(24));
                if (indexUsed.indexOf(randomIndex) == -1) {
                    if (Math.abs(arrIndex[i - 1] - randomIndex) == 1 || Math.abs(arrIndex[i - 1] - randomIndex) == 8) {
                        //do nothing
                    }
                    else {
                        arrIndex.push(randomIndex);
                        indexUsed.push(randomIndex);
                        checkCondition = false;
                    }
                }
            }
        }
        if (counterExceeded) {
            console.log([3, 23, 11, 18, 5, 10, 24, 4, 16, 12, 17, 13, 2, 20, 6, 15, 19, 8, 21, 1, 7, 14, 9, 22]);
            return ([3, 23, 11, 18, 5, 10, 24, 4, 16, 12, 17, 13, 2, 20, 6, 15, 19, 8, 21, 1, 7, 14, 9, 22]);
        }
        else {
            console.log(arrIndex);
            return (arrIndex);
        }
    };
    AppComponent.prototype.moveToSurvey = function () {
        var _this = this;
        console.log("move to survey");
        this.showInstructions = false;
        this.showSurvey = true;
        //Moving the clock time to this point
        this.data.getClock().subscribe(function (time) {
            _this.time = time;
            if (!_this.startTimeFirstTimeDefine) {
                _this.startTime = time;
                console.log(_this.startTime);
                _this.startTimeFirstTimeDefine = true;
            }
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(291),
        styles: [__webpack_require__(290)]
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* HostListener */])('window:resize', ['$event']),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__models_userResponse_model__["a" /* UserResponse */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__models_userResponse_model__["a" /* UserResponse */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_userResponse_model__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_service__ = __webpack_require__(106);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClientModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_7__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_5__models_userResponse_model__["a" /* UserResponse */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(83)(false);
// imports


// module
exports.push([module.i, "body{\n  margin: 5%;\n}\n\n.experimentHeader{\n  display:-ms-flexbox;\n  display:flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n\n.experimentCounter{\n  display:-ms-flexbox;\n  display:flex;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n\n\n\n.timelineVis{\n  padding-left:30%;\n  padding-right:30%;\n}\n\n.nextButton{\n  padding-top: 2%;\n  display:-ms-flexbox;\n  display:flex;\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n\nspan{\n  font-size: 20px;\n}\n\n.instructions{\n  margin: 2%;\n}\n.leaveInstruction{\n  display:inline-block;\n  float: right;\n  margin-left: 0.5%;\n  background-color: lightseagreen; /* Green */\n  border: none;\n  color: white;\n  font-size: 32px;\n\n}\n\n.nextButtonActive{\n  margin-left: 0.5%;\n  background-color: indianred; /* Green */\n  border: none;\n  color: white;\n  font-size: 20px;\n}\n\n.nextButtonInActive{\n  margin-left: 0.5%;\n  font-size: 20px;\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 291:
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"experimentHeader\" id=\"expHeader\" >\n    <h1 >\n      {{title}}\n    </h1>\n</div>\n\n<div class=\"instructions\" [hidden]=\"!showInstructions\"  >\n  <h3> Instructions</h3>\n  <p>Vis Lab HCI project group welcomes you to our timeline survey. A timeline is an abstract visual representation of temporal events. </p>\n\n  <p>In this survey we will ask you 24 questions which you have to answer with the use of a timeline visualizations. After you answer the question you can move to the next question. At the end of the survey we will ask you to rate your questions and ask you briefly about your experience throught the survey. </p>\n\n  <p> One of our team member will always be available to answer your questions and address your concerns. Your data will be completely anonymized with no reference back to you. </p>\n\n  <p> At this point if you have any questions, please ask our team member and we will be happy to help. Otherwise, please select Next to start the survey </p>\n  <button class=\"leaveInstruction\" (click)=\"moveToSurvey()\">Next</button>\n\n\n</div>\n\n<div class=\"SurveyContainer\" [hidden]=\"!showSurvey\">\n<div class=\"experimentCounter\" id=\"counter\" >\n\n  <h2>\n    Q{{currentQuestionCounter+1}}/{{totalQuestionCounter}}.  {{currentQuestion}}\n    <!--<p>The time is {{time}}</p>-->\n  </h2>\n</div>\n\n\n\n<div class=\"visualizationContainer\" [style.width.px]=\"width\"\n     [style.height.px]=\"height\" class=\"timelineVis\" id=\"tvViz\">\n\n  <img width=\"100%\" [src]=\"imgHome+imgName\">\n\n</div>\n\n<div class=\"nextButton\">\n\n  <span>Enter your answer:</span> <input style=\"margin-left: 0.5%\" [(ngModel)]=\"userInput\" (ngModelChange)=\"userInputChange()\">\n  <button [class.nextButtonInActive]=\"ifInputNotProvided\" [class.nextButtonActive]=\"!ifInputNotProvided \" id=\"nextQuestionButton\" title=\"Please enter your answer\" [disabled]=\"ifInputNotProvided \" (click)=\"loadNextQuestion()\"> Next </button>\n\n</div>\n</div>\n"

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(228);


/***/ })

},[581]);
//# sourceMappingURL=main.bundle.js.map