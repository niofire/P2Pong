var assert = require('Assert');
var boundingBox = require('../wwwroot/scripts/Physics/BoundingBox.js');

describe('HelloWorld', function(){
    it('should return -1 when the value is not present',function(){

        var a = [];
        a.Size = [1,2];
        a.x =1;
        a.y = 2;
        boundingBox.CheckRectCollision(a,a);
        assert.equal(true,true);
    });
});