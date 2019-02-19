var game = {
    totalCash: 0,
}

var levels = new Map();

var ticks = 0;

function gameLoop() {
    ticks++;
    document.getElementById('ticks').innerHTML = ticks;
}

function main() {
    // create levels
    levels.set('Cave', { name: 'Cave', level: 1, cps: 1, unlocked: true });
    levels.set('Hut', { name: 'Hut', level: 1, cps: 5, unlocked: false });
    levels.set('Cabin', { name: 'Cabin', level: 1, cps: 10, unlocked: false });
    levels.set('Apartment', { name: 'Apartment', level: 20, cps: 1, unlocked: false });
    levels.set('Condo', { name: 'Condo', level: 1, cps: 40, unlocked: false });
    levels.set('SmallHouse', { name: 'SmallHouse', level: 80, cps: 1, unlocked: false });
    levels.set('MediumHouse', { name: 'MediumHouse', level: 160, cps: 1, unlocked: false });
    levels.set('LargeHouse', { name: 'LargeHouse', level: 320, cps: 1, unlocked: false });
    levels.set('Mansion', { name: 'Mansion', level: 1, cps: 640, unlocked: false });
    levels.set('Palace', { name: 'Palace', level: 1, cps: 1280, unlocked: false });

    // render levels
    levels.forEach(level => {
        
        var container = document.getElementById('container');
        var newSection = document.createElement("section");
        newSection.setAttribute('id', level.name);

        var newUL = document.createElement("ul");
        newUL.setAttribute('id', level.name + "-attrib-list");
        newSection.appendChild(newUL);

        for(var attrib in level) {
            var node = document.createElement("li");
            var textNode = document.createTextNode(attrib + ": " + level[attrib]);
            node.appendChild(textNode);

            newUL.appendChild(node);
        }
        container.appendChild(newSection);
    });
    
    // initialize the game loop
    setInterval(gameLoop, 100); 
}

main();