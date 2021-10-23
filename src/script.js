// TOOL MENU
let tool = document.getElementById("toolButton");
let toolMenu = document.getElementById("tools");
tool.addEventListener("click", () => {
    toggleMenu(toolMenu);
});

// OPTION MENU
let option = document.getElementById("optionButton");
let optionMenu = document.getElementById("options");
option.addEventListener("click", () => {
    toggleMenu(optionMenu);
});

// TOGGLE MENU FUNCTION
function toggleMenu(element) {
    if(element.className == "open") {
        element.setAttribute("class", "closed");
    }
    else {
        element.setAttribute("class", "open");
    }
}

planck.testbed(function(testbed) {
    // Your testbed code
    var pl = planck, Vec2 = pl.Vec2;

    var world = pl.World(Vec2(0, 0));

    testbed.height = 80;
    testbed.y = 0;

    console.log(testbed.width);
    console.log(testbed);

    var bar = world.createBody();
    // floor
    bar.createFixture(pl.Edge(Vec2(-testbed.width/2, -testbed.height/2), Vec2(testbed.width/2, -testbed.height/2)));
    // ceiling
    bar.createFixture(pl.Edge(Vec2(-testbed.width/2, testbed.height/2), Vec2(testbed.width/2, testbed.height/2)));
    // left wall
    bar.createFixture(pl.Edge(Vec2(-testbed.width/2, -testbed.height/2), Vec2(-testbed.width/2, testbed.height/2)));
    // right wall
    bar.createFixture(pl.Edge(Vec2(testbed.width/2, -testbed.height/2), Vec2(testbed.width/2, testbed.height/2)));

        var box = world.createBody().setDynamic();
        box.createFixture(pl.Box(0.5, 0.5));
        box.setPosition(Vec2(1, 1 + 20));
        box.setMassData({
          mass : 1,
          center : Vec2(),
          I : 1
        })

    return world
  });
  