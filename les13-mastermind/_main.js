const _0x151e27 = _0x235f;
(function (_0x1f9954, _0x57fa98) {
    const _0x33ed3b = _0x235f,
        _0x30b98d = _0x1f9954();
    while (!![]) {
        try {
            const _0x125c7c =
                parseInt(_0x33ed3b(0x16b)) / 0x1 +
                parseInt(_0x33ed3b(0x14b)) / 0x2 +
                -parseInt(_0x33ed3b(0x14a)) / 0x3 +
                parseInt(_0x33ed3b(0x159)) / 0x4 +
                (parseInt(_0x33ed3b(0x15e)) / 0x5) *
                    (parseInt(_0x33ed3b(0x15d)) / 0x6) +
                parseInt(_0x33ed3b(0x155)) / 0x7 +
                -parseInt(_0x33ed3b(0x15c)) / 0x8;
            if (_0x125c7c === _0x57fa98) break;
            else _0x30b98d['push'](_0x30b98d['shift']());
        } catch (_0x34eff4) {
            _0x30b98d['push'](_0x30b98d['shift']());
        }
    }
})(_0x1af8, 0xda063);
const $tryBtn = document['getElementById'](_0x151e27(0x14e)),
    $retryBtn = document[_0x151e27(0x14f)](_0x151e27(0x149)),
    $tryContainer = document['getElementById'](_0x151e27(0x151)),
    $winnerMessageContainer = document[_0x151e27(0x14f)](_0x151e27(0x16a)),
    $solutionContainer = document[_0x151e27(0x14f)](_0x151e27(0x162)),
    $inputs = document['getElementsByClassName'](_0x151e27(0x161)),
    mastermindState = { solution: null, guessCount: 0x0 },
    generateSolution = function () {
        const _0x312cf9 = _0x151e27,
            _0x156234 = document[_0x312cf9(0x164)]('solution-option');
        let _0xc95b21 = [];
        for (let _0x31e3cb = 0x0; _0x31e3cb < 0x5; _0x31e3cb++) {
            const _0x145e94 = Math['floor'](Math['random']() * 0x5);
            _0xc95b21['push'](_0x145e94),
                (_0x156234[_0x31e3cb][_0x312cf9(0x166)] = _0x145e94);
        }
        return _0xc95b21;
    },
    getGuess = function () {
        const _0x5290a3 = _0x151e27;
        let _0xbd61f9 = [];
        for (let _0x306ed7 = 0x0; _0x306ed7 < 0x5; _0x306ed7++) {
            const _0xf71e4d = parseInt($inputs[_0x306ed7]['value']);
            if (isNaN(_0xf71e4d) || _0xf71e4d < 0x0 || _0xf71e4d > 0x4)
                return ![];
            _0xbd61f9[_0x5290a3(0x152)](_0xf71e4d);
        }
        return _0xbd61f9;
    },
    writeGuess = function (_0xfdd026, _0x5a96bd, _0x5b09ac) {
        const _0x3f59a8 = _0x151e27,
            _0x170e7f =
                _0x3f59a8(0x167) +
                _0xfdd026[0x0] +
                _0x3f59a8(0x165) +
                _0xfdd026[0x1] +
                _0x3f59a8(0x165) +
                _0xfdd026[0x2] +
                '</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22try-option\x22>' +
                _0xfdd026[0x3] +
                _0x3f59a8(0x165) +
                _0xfdd026[0x4] +
                _0x3f59a8(0x16c) +
                _0x5b09ac +
                _0x3f59a8(0x15f) +
                _0x5a96bd +
                _0x3f59a8(0x168);
        $tryContainer[_0x3f59a8(0x158)] += _0x170e7f;
    },
    checkCorrectNumberAndPlace = function (_0x423ab7, _0x1eb351) {
        let _0xbd70e8 = 0x0;
        for (let _0x4ef9b8 = 0x0; _0x4ef9b8 < 0x5; _0x4ef9b8++) {
            _0x423ab7[_0x4ef9b8] === _0x1eb351[_0x4ef9b8] && _0xbd70e8++;
        }
        return _0xbd70e8;
    },
    checkCorrectNumber = function (_0xd61e66, _0x5943b2, _0x1cc659) {
        const _0x50e1d8 = _0x151e27;
        let _0xc04c56 = 0x0,
            _0x1034bf = [0x0, 0x0, 0x0, 0x0, 0x0],
            _0x3da85 = [0x0, 0x0, 0x0, 0x0, 0x0];
        for (let _0x16030f = 0x0; _0x16030f < 0x5; _0x16030f++) {
            for (let _0x40f583 = 0x0; _0x40f583 < 0x5; _0x40f583++) {
                _0x5943b2[_0x40f583] === _0x16030f && _0x3da85[_0x16030f]++,
                    _0xd61e66[_0x40f583] === _0x16030f &&
                        _0x1034bf[_0x16030f]++;
            }
            _0xc04c56 += Math[_0x50e1d8(0x14d)](
                _0x1034bf[_0x16030f],
                _0x3da85[_0x16030f],
            );
        }
        return _0xc04c56 - _0x1cc659;
    },
    endGame = function (_0x5cad63) {
        const _0x3b66f1 = _0x151e27;
        ($winnerMessageContainer['firstElementChild'][_0x3b66f1(0x166)] =
            _0x5cad63),
            $winnerMessageContainer['classList']['remove'](_0x3b66f1(0x153)),
            $solutionContainer[_0x3b66f1(0x15a)]['remove'](_0x3b66f1(0x169)),
            ($tryBtn[_0x3b66f1(0x163)] = _0x3b66f1(0x163));
    },
    initMastermind = function () {
        const _0x3e72fa = _0x151e27;
        (mastermindState['solution'] = generateSolution()),
            (mastermindState[_0x3e72fa(0x15b)] = 0x0),
            $winnerMessageContainer[_0x3e72fa(0x15a)][_0x3e72fa(0x150)](
                _0x3e72fa(0x153),
            ),
            $solutionContainer[_0x3e72fa(0x15a)][_0x3e72fa(0x150)](
                _0x3e72fa(0x169),
            ),
            ($tryBtn[_0x3e72fa(0x163)] = '');
        for (let _0x3fb89c = 0x0; _0x3fb89c < 0x5; _0x3fb89c++) {
            $inputs[_0x3fb89c][_0x3e72fa(0x157)] = '';
        }
        $tryContainer['innerHTML'] = '';
    },
    makeGuess = function () {
        const _0x5078df = _0x151e27,
            _0x2da904 = getGuess();
        if (_0x2da904 === ![]) {
            $tryBtn[_0x5078df(0x166)] = 'Incorrect\x20input,\x20try\x20again';
            return;
        } else $tryBtn['textContent'] = 'Try';
        const _0x579659 = checkCorrectNumberAndPlace(
                mastermindState[_0x5078df(0x154)],
                _0x2da904,
            ),
            _0x186f4a = checkCorrectNumber(
                mastermindState['solution'],
                _0x2da904,
                _0x579659,
            );
        mastermindState[_0x5078df(0x15b)]++,
            writeGuess(_0x2da904, _0x579659, _0x186f4a);
        if (_0x579659 === 0x5) endGame(_0x5078df(0x156));
        else
            mastermindState[_0x5078df(0x15b)] === 0x3 &&
                endGame('You\x20lost,\x20try\x20again?');
    };
initMastermind(),
    $tryBtn['addEventListener'](_0x151e27(0x14c), makeGuess),
    $retryBtn[_0x151e27(0x160)](_0x151e27(0x14c), initMastermind);
function _0x235f(_0x232557, _0x942bc4) {
    const _0x1af825 = _0x1af8();
    return (
        (_0x235f = function (_0x235f20, _0x178dbf) {
            _0x235f20 = _0x235f20 - 0x149;
            let _0x3e51d4 = _0x1af825[_0x235f20];
            return _0x3e51d4;
        }),
        _0x235f(_0x232557, _0x942bc4)
    );
}
function _0x1af8() {
    const _0x4bf51a = [
        '2037332RNQFUm',
        'classList',
        'guessCount',
        '22524176UYsVdt',
        '54UVgmFY',
        '870995DnZQBJ',
        '</span></p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Juiste\x20nummer\x20op\x20de\x20juiste\x20plaats:\x20<span\x20class=\x22correct-place\x22>',
        'addEventListener',
        'try-input',
        'solution-container',
        'disabled',
        'getElementsByClassName',
        '</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22try-option\x22>',
        'textContent',
        '<div\x20class=\x22try\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22try-option-container\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22try-option\x22>',
        '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>',
        'hidden',
        'winner-message-container',
        '997056RqzKfE',
        '</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p>Juiste\x20nummer:\x20<span\x20class=\x22correct-color\x22>',
        'winner-submit-btn',
        '3400833xvyYzd',
        '2403366zriQwQ',
        'click',
        'min',
        'try-submit-btn',
        'getElementById',
        'add',
        'tries-container',
        'push',
        'dont-show',
        'solution',
        '3964079VbEBOg',
        'You\x20won,\x20try\x20again?',
        'value',
        'innerHTML',
    ];
    _0x1af8 = function () {
        return _0x4bf51a;
    };
    return _0x1af8();
}
