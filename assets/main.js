var game = {
    totalCash: 10,
    currentCPS: 0
}

var levels = new Map();
var ticks = 0;
var msgTimeout;

// clears message after specified amount of time
function clearMessage() {
    let messageBox = document.getElementById('messages');
    messageBox.style.display = "none";
    messageBox.innerHTML = "";
}

// adds message to the counter
function addMessage(message) {
    clearInterval(msgTimeout);
    let messageBox = document.getElementById('messages');
    messageBox.innerHTML = message;
    messageBox.style.display = "initial";
    msgTimeout = setTimeout(clearMessage, 3000);
}

// updates game object when the button is clicked
function updateObject(name) {
    if(name != null) {
        if(levels.get(name) == null) {
            return console.error('Game object does not exist');
        }

        let level = levels.get(name);

        if(level.unlocked == false) {
            var neededCash = (level.cps * 10);
            if(game.totalCash >= neededCash) {
                level.unlocked = true;
                document.getElementById(level.name + '-upgrade-button').innerHTML = "Upgrade";
                document.getElementById(level.name + "-attrib-unlocked").innerHTML = "unlocked: " + level.unlocked;
                game.totalCash = game.totalCash - neededCash;
            }else{
                addMessage("You don't have enough cash for that. Amount needed: " + neededCash + "!");
            }
        }else{
            var neededCash = (level.cps * 5);
            if(game.totalCash >= neededCash) {
                level.level++;
                level.cps = (level.baseCPS * level.level);
                game.totalCash = game.totalCash - neededCash;
                document.getElementById(level.name + "-attrib-cps").innerHTML = "cps: " + level.cps;
                document.getElementById(level.name + "-attrib-level").innerHTML = "level: " + level.level;
            }else{
                addMessage("You don't have enough cash for that. Amount needed: " + neededCash + "!");
            }
        }

    }else{
        return console.error('No name provided.');
    }
}

// primary game loop
function gameLoop() {
    // tick counter
    ticks++;
    document.getElementById('ticks').innerHTML = ticks;

    // iterate through each unlocked level and increase game cash and current cash/sec
    levels.forEach(level => {
        if(level.unlocked) {
            let cps = (level.baseCPS * level.level);
            game.totalCash += cps;
            game.currentCPS += cps;
        }
    })

    // update DOM with new values
    document.getElementById('totalCash').innerHTML = game.totalCash;
    document.getElementById('cps').innerHTML = game.currentCPS;

    // reset game CPS counter to prevent incrementing
    game.currentCPS = 0;
}

function main() {
    // create levels
    levels.set('Cave', { name: 'Cave', level: 1, cps: 1, baseCPS: 1, unlocked: false, });
    levels.set('Hut', { name: 'Hut', level: 1, cps: 5, baseCPS: 5, unlocked: false });
    levels.set('Cabin', { name: 'Cabin', level: 1, cps: 10, baseCPS: 10, unlocked: false });
    levels.set('Apartment', { name: 'Apartment', level: 1, cps: 20, baseCPS: 20, unlocked: false });
    levels.set('Condo', { name: 'Condo', level: 1, cps: 40, baseCPS: 40, unlocked: false });
    levels.set('SmallHouse', { name: 'SmallHouse', level: 1, cps: 80, baseCPS: 80, unlocked: false });
    levels.set('MediumHouse', { name: 'MediumHouse', level: 1, cps: 160, baseCPS: 160, unlocked: false });
    levels.set('LargeHouse', { name: 'LargeHouse', level: 1, cps: 320, baseCPS: 320, unlocked: false });
    levels.set('Mansion', { name: 'Mansion', level: 1, cps: 640, baseCPS: 640, unlocked: false });
    levels.set('Palace', { name: 'Palace', level: 1, cps: 1280, baseCPS: 1280, unlocked: false });

    // render levels
    levels.forEach(level => {
        
        var container = document.getElementById('container');
        var newSection = document.createElement("div");
        newSection.setAttribute('id', level.name);
        newSection.setAttribute('class', "game-item");

        var newUL = document.createElement("ul");
        newUL.setAttribute('id', level.name + "-attrib-list");
        newSection.appendChild(newUL);

        var button = document.createElement("button");
        button.setAttribute('onclick', 'updateObject(\'' + (level.name).toString() + '\')');
        button.setAttribute('id', level.name + "-upgrade-button");
        button.innerHTML = "Unlock";
        newSection.appendChild(button);

        for(var attrib in level) {
            var node = document.createElement("li");
            var textNode = document.createTextNode(attrib + ": " + level[attrib]);
            node.appendChild(textNode);
            node.setAttribute('id', (level.name + "-attrib-" + attrib));
            newUL.appendChild(node);
        }
        container.appendChild(newSection);
    });
    
    // initialize the game loop
    setInterval(gameLoop, 1000); 
}

main();