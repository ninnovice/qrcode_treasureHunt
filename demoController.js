angular
        .module('demoApp')
        .controller("DemoCtrl", DemoCtrl);

function DemoCtrl($scope, $http, $window) {
    $http.get('qrcode_treasureHunt/res/dataset.json').success(function (data) {
        console.log(data);
        $scope.questions = data;

    });

    $scope.controls = true;
    $scope.imgPath = 'res/astroHappy.jpg';
    console.log($scope.imgPath);
    $scope.selectedAns;
    $scope.maxLevel = 3;
    $scope.start = function () {
        $scope.cameraRequested = true;
        $scope.controls = false;
        $scope.questActive = false;
        $scope.questCompleted = false;
        $scope.activeQuest;
        
    }



    $scope.processURLfromQR = function (url) {
        $scope.controls = false;
        $scope.url = url;
        $scope.playAudio();
        $scope.questActive = true;
        $scope.cameraRequested = false;
        $scope.generateRandQues($scope.maxLevel);
        $scope.quiz($scope.quesID);
    }

    $scope.generateRandQues = function (level) {
        $scope.quesID = Math.floor((Math.random() * level) + 1);
        console.log($scope.quesID);
    }


    $scope.playAudio = function () {
        var audio = new Audio('res/bujho.wav');
        audio.play();

    };

    $scope.quiz = function (quesID) {

        var quesNo = parseInt(quesID);
        // console.log($scope.questions.question[parseInt(quesID)].statement);
        $scope.activeQuest = $scope.questions.question[parseInt(quesID)];

         //console.log(activeQuest.statement)
    }

    $scope.check = function (selectedAns) {
        //console.log(selectedAns);
        //console.log($scope.activeQuest.answer);
        if (selectedAns == $scope.activeQuest.answer) {
            //alert('hooray');
            $scope.questActive = false;
            $scope.questCompleted = true;
            $scope.reloadPage = function(){$window.location.reload();}
        }
        else {
            $scope.imgPath = 'res/astroFall.jpg';
        }
    }


}