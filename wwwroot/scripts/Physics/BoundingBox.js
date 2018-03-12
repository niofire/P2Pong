var _testRectCollision = function (p1, p2, s1, s2) {
    //p2s test if left || right corner are within the bound of p1
    return (p2 > p1 && p2 < p1 + s1)
        || (p2 + s2 > p1 && p2 + s2 < p1 + s1)
}

var CheckRectCollision = function (b1, b2) {

    return _testRectCollision(b1.x, b2.x, b1.Size[0], b2.Size[0])
        && _testRectCollision(b1.y, b2.y, b1.Size[1], b2.Size[1])
         
}