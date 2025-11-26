# disablePaste — Version 2.0  
### Release Tag: `v2.0.0`  
### Status: **Stable / Production-Ready**

---

## 🔄 Version 2.0 Changelog

### Summary  
Version 2.0 introduces a robust, fully client-side paste-blocking solution designed specifically for **Forsta open-end questions**. This update significantly improves cross-platform behavior (Windows, macOS, Android, Samsung Keyboard), simplifies per-question deployment, and adds a fall-through protection layer to catch edge-case paste methods.

---

## ✔ Enhancements in Version 2.0

### 1. Single-Variable Configuration  
Configuration is now driven by a single variable at the top of the script:

```javascript
var qid = 'QX';
```

Change this one line for each question where paste-blocking is required. No additional code editing is needed.

---

### 2. Improved Mobile (Android + Samsung Keyboard) Protection  
New paste detection and prevention logic includes:

- `beforeinput` interception of:
  - `insertFromPaste`
  - `insertFromDrop`
  - `insertReplacementText`
- Multi-character insertion blocking (`e.data.length > 1`)
- Hardened defenses against:
  - Samsung Keyboard clipboard paste
  - Gboard paste
  - Android long-press → Paste
  - Drag/drop text insertion

These protections dramatically improve blocking reliability on the most paste-problematic environments.

---

### 3. Typing-Heuristic Fallback  
If all other paste hooks are bypassed:

- Rejects sudden jumps > 1 character per input event  
- Rejects typing faster than ~50ms between inserted characters  
- Restores previous, valid text state and cursor position  
- Prevents injected clipboard content from appearing in the field  

This layer catches all residual edge cases — including exotic keyboard behaviors — and enforces strict “no paste” policy.

---

### 4. Cross-Platform Stability Improvements  
- All logic wrapped in `DOMContentLoaded`  
- Early-return break if input element cannot be found  
- Avoids Forsta’s server-side parser entirely  
- Purely client-side operation for maximum reliability  

---

### 5. Improved Maintainability & Clarity  
- Version header included at the top of script  
- Expanded usage instructions  
- Clear limitations and supported contexts  
- Comments standardized for readability  

---

## ✨ Features Retained From Previous Versions  
- Desktop paste blocking (Ctrl+V, Cmd+V, Shift+Insert)  
- Right-click and long-press context menu suppression  
- Predictable per-question behavior  
- Independence from Forsta’s “JavaScript” scripting tab  

---

## 📘 Usage Notes

### Placement  
Paste the entire `<script>...</script>` block into the **Interviewer Instructions** of the open-end question you want to protect.

**Do NOT** place this in:
- The Forsta “JavaScript” tab  
- Page logic  
- Server-side validation scripting  

Only the Interviewer Instructions text area runs client-side per-question script.

---

### Required Configuration  
Edit only this line:

```javascript
var qid = 'Q2';
```

Set it to the current question ID.

Correct examples:
- `var qid = 'Q5';`
- `var qid = 'Q12';`
- `var qid = 'Q31';`

---

### Assumptions  
The script targets elements with the ID structure:

```
<QID>_input
```

which is Forsta’s standard naming for open-end textarea inputs.

---

## 🚫 Known Limitations  
Version 2.0 does **not** automatically support:

- Grid “Other Specify” fields  
- Multi-input questions  
- Custom OE widgets  
- Any non-standard markup  
- File/image paste blocking  

Support for multi-field detection will be evaluated for v2.2.

---

## 🧪 Testing Checklist

### Desktop  
Verify on Chrome, Edge, Firefox, Safari:

- Ctrl+V blocked  
- Cmd+V blocked  
- Shift+Insert blocked  
- Right-click → Paste blocked  

### Android  
Verify on Samsung + Gboard + Chrome + Firefox:

- Long-press paste blocked  
- Keyboard clipboard blocked  
- Multi-character injection blocked  
- Drag/drop paste blocked  

### iOS (for v2.1)  
Test:
- Long-press paste  
- Keyboard toolbar paste  
- Safari-specific paste UI  

---

## 🎯 Intended Use Cases  
Version 2.0 is optimized for:

- High-integrity unaided-response research  
- Single open-end per page  
- Situations requiring strict prevention of copy/paste contamination  

---

## 🏁 Status  
Version 2.0 is **stable, production-ready**, and recommended for deployment on standard open-end questions.

Planned future improvements:

- **v2.1:** iOS/Safari-specific paste suppression  
- **v2.2:** Optional multi-input / Other-Specify support  
- **v2.3:** Configurable behavior flags (e.g., allow right-click but block paste)  

