<script>
// ======================================================================
// Paste-Blocking Script for Forsta Open-Ends
// Version: 2.0
//
// HOW TO USE:
// • Paste this ENTIRE <script> block into the *Interviewer Instructions*
//   of the open-end question you want to lock down.
//
// • Update the 'qid' variable below to match the question's ID.
//     Example:  var qid = 'Q12';
//
// • This script ONLY targets a single open-end field with ID pattern:
//       <QID>_input
//   (Forsta automatically generates these for OE textareas.)
//
// WHAT THIS SCRIPT DOES:
// • Blocks all paste mechanisms on desktop (Ctrl+V, Cmd+V, Shift+Insert).
// • Blocks right-click and long-press menus (prevents “Paste” options).
// • Blocks Android/Samsung keyboard clipboard injection via beforeinput.
// • Blocks fast multi-character inserts (clipboard-style dumps).
//
// LIMITATIONS / NOTES:
// • Does NOT automatically handle “Other Specify” OEs inside grids
//   or multi-input questions — those require a different selector.
// • This script must run client-side (hence placed in Interviewer
//   Instructions, not the Forsta JavaScript tab).
// ======================================================================

document.addEventListener('DOMContentLoaded', function () {

    // Change ONLY this line for each new question
    var qid = 'Q2';

    // Automatically target the OE input for this question
    var el = document.getElementById(qid + '_input');
    if (!el) return;

    // --- Desktop-friendly protections ---

    el.onpaste = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        return false;
    };

    el.oncontextmenu = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        return false;
    };

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

    // --- Mobile / Android / Samsung protections ---
    if (el.addEventListener) {
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
    }

    // --- Paranoid fallback: block "too big" or "too fast" inserts ---
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

});
</script>
