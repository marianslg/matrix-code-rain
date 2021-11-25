const characters = 'ゝゞぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん日人中合一本大新用見方入報会事時年気上出定情月最問生間場前無分内行全目利記関画動手子料作検高自表名取覧者約開連下知社通索理体今地登物部品集特能発数業他金録小文付外要後使法様当規楽式意加国話以有回ヽヾァアィイゥウヴェエォオヵカガキギクグヶケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲン';
var divs_array = []
var iii = 0;
var list_position = [];

function onLoad() {
    window.setInterval(insertDrop, 120);
    window.setInterval(addCharacterInToDrop, 100);
}

function addCharacterInToDrop() {
    divs_array.forEach(element => {
        if (window.innerHeight >= element.clientHeight + 25) {
            for (let i = 0; i < element.children.length; i++) {
                element.children[i].classList = 'drop-tail';
            }

            let newSpan = document.createElement('span');
            newSpan.classList = 'drop-head';
            newSpan.innerHTML = get_random_character();

            element.appendChild(newSpan);
        } else {
            list_position.splice(list_position.indexOf(element.style.left.replace('px', '')), 1);
            element.remove();
        }
    })
}

function insertDrop() {
    let main_div = document.getElementById('main-div')

    const random_position = getValidatedRandomPosition(getMaxBlackArea());

    if (random_position >= 0) {
        let newDiv = document.createElement('div');

        newDiv.classList = 'drop';
        newDiv.style.cssText = `left: ${random_position}px`;

        let newSpan = document.createElement('span');
        newSpan.classList = 'drop-head';
        newSpan.innerHTML = get_random_character();

        newDiv.appendChild(newSpan);

        main_div.appendChild(newDiv);

        divs_array.push(newDiv)
    }
}

function get_random_character() {
    return characters[getRandom(0, characters.length)];
}

function getRandom(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

function getValidatedRandomPosition(limits) {
    // size del div con letras 15px
    let count = 0;
    let random = 0;
    let get_new_random = false;
    do {
        random = getRandom(limits.begin, limits.end);
        get_new_random = false;

        list_position.forEach(e => {
            if (Math.abs(e - random) <= document.documentElement.style.getPropertyValue('--size').replace('px', '') * 2) get_new_random = true;
        })

        if (count++ >= 100) break;
    } while (get_new_random)

    if (count >= 100) {
        return -1;
    } else {
        list_position.push(random);

        return random;
    }
}

function getMaxBlackArea() {
    pair = {
        'begin': 0,
        'end': window.innerWidth
    };

    list_position.push(pair.begin);
    list_position.push(pair.end);

    list_position.sort(function(a, b) {
        return a - b;
    });

    let max_distance = 0;

    for (let i = 0; i < list_position.length; i++) {
        if (i + 1 < list_position.length && (list_position[i + 1] - list_position[i] > max_distance)) {
            max_distance = list_position[i + 1] - list_position[i];
            pair.begin = list_position[i + 1]
            pair.end = list_position[i];
        }
    }

    list_position.splice(list_position.length - 1);
    list_position.splice(list_position.length - 1);

    return pair;
}