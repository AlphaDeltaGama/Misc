(function () {
    function attachPasteBlock(el) {
        if (!el) return;

        // --- V1.5 paste-blocking logic ---

        // Block standard paste event
        el.onpaste = function (e) {
            if (e && e.preventDefault) e.preventDefault();
            return false;
        };

        // Block context menu (right-click / long-press)
        el.oncontextmenu = function (e) {
            if (e && e.preventDefault) e.preventDefault();
            return false;
        };

        // Desktop: block Ctrl/Cmd+V + Shift+Insert
        el.onkeydown = function (e) {
            e = e || window.event;
            var key = e.key || e.keyCode;
            var isV = (key === 'v' || key === 'V' || key === 86);
            var isInsert = (key === 'Insert' || key === 45);

            if ((e.ctrlKey || e.metaKey) && isV) {
                if (e.preventDefault) e.preventDefault();
                return false;
            }
            if (e.shiftKey && isInsert) {
                if (e.preventDefault) e.preventDefault();
                return false;
            }
        };

        // Android / Samsung: beforeinput catching paste-like behavior
        el.addEventListener('beforeinput', function (e) {
            var t = e.inputType || '';

            if (
                t === 'insertFromPaste' ||
                t === 'insertFromPasteAsQuotation' ||
                t === 'insertFromDrop' ||
                t === 'insertReplacementText'
            ) {
                if (e.preventDefault) e.preventDefault();
            }

            if (e.data && e.data.length > 1) {
                if (e.preventDefault) e.preventDefault();
            }
        });

        // Paranoid fallback – detect big/fast inserts
        var lastValue = el.value || '';
        var lastTime = Date.now();

        el.addEventListener('input', function () {
            var now = Date.now();
            var current = el.value || '';
            var diff = current.length - lastValue.length;

            if (diff > 1 || (diff > 0 && (now - lastTime) < 50)) {
                el.value = lastValue;

                if (el.setSelectionRange) {
                    el.setSelectionRange(lastValue.length, lastValue.length);
                }
            } else {
                lastValue = current;
                lastTime = now;
            }
        });
    }

    // Expose a global helper
    window.disablePaste = function (qid) {
        if (!qid) return;                    // client-side has no CurrentForm()
        var el = document.getElementById(qid + '_input');
        if (el) attachPasteBlock(el);
    };
})();
