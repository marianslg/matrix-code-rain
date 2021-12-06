const characters = 'ゝゞぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん日人中合一本大新用見方入報会事時年気上出定情月最問生間場前無分内行全目利記関画動手子料作検高自表名取覧者約開連下知社通索理体今地登物部品集特能発数業他金録小文付外要後使法様当規楽式意加国話以有回ヽヾァアィイゥウヴェエォオヵカガキギクグヶケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲン';
var divs_array = []
var list_position = [];
var interval1;
var interval2;
var isRunning = false;

function onLoad() {
    startInterval();
}

function addCharacterInEachDrop() {
    divs_array.forEach(element => {
        if (window.innerHeight * 1.6 >= element.clientHeight) {
            let ii = 0;
            for (let i = 0; i < element.children.length; i++) {
                element.children[i].classList = 'drop-tail';
                if (i > ((element.clientHeight / 25) / 4)) {
                    let por = (ii + 1) / i;
                    element.children[ii].style = `opacity: ${por < 0.3 ? 0 : por}`;
                    ii++;
                }
            }

            changeTailCharacter(element);

            element.appendChild(buildDropHeadSpan());
        } else {
            list_position.splice(list_position.indexOf(parseInt(element.style.left.replace('px', ''))), 1);
            element.remove();
        }
    })
}

function changeTailCharacter(div) {

    if (div.children.length > 6) {
        let randomIndex = getRandom(0, div.children.length - 1);
        div.children[randomIndex].innerHTML = getRandomCharacter();
    }
}

function insertDrop() {
    let main_div = document.getElementById('main-div')

    const random_position = getValidatedRandomPosition(getMaxBlackArea());

    if (random_position >= 0) {
        let newDiv = document.createElement('div');

        newDiv.classList = 'drop';
        newDiv.style.cssText = `left: ${random_position}px; font-size:${getRandom(20, 40)}px`;

        newDiv.appendChild(buildDropHeadSpan());

        main_div.appendChild(newDiv);

        divs_array.push(newDiv)
    }
}

function buildDropHeadSpan() {
    let newSpan = document.createElement('span');
    newSpan.classList = 'drop-head';
    newSpan.innerHTML = getRandomCharacter();

    return newSpan;
}

function getRandomCharacter() {
    return characters[getRandom(0, characters.length)];
}

function getRandom(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

function getValidatedRandomPosition(limits) {
    let count = 0;
    let random = 0;
    let get_new_random = false;
    do {
        random = getRandom(limits.begin, limits.end);
        get_new_random = false;

        list_position.forEach((e) => {
            if (Math.abs(e - random) <= document.documentElement.style.getPropertyValue('--size').replace('px', '')) {
                get_new_random = true;
            }
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

//Buscar el espacio mas grande sin gotas para que la lluvia quede medianamente uniforme.
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
            pair.begin = list_position[i];
            pair.end = list_position[i + 1]
        }
    }

    list_position.shift();
    list_position.pop();

    return pair;
}

function startInterval() {
    interval1 = window.setInterval(insertDrop, 300);
    interval2 = window.setInterval(addCharacterInEachDrop, 250);

    isRunning = true;
}

function stop() {
    if (isRunning) {
        clearInterval(interval1);
        clearInterval(interval2);

        isRunning = false;
    } else {
        startInterval();
    }
}

//element.appendChild(buildDropHeadSpan());
function degrade() {

}