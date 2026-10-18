# Paradigm

A Tetris-style priority stack for your phone. Everything here is free.

## 1. Put it online (GitHub Pages, ~10 min)

1. Create a free account at github.com.
2. Create a new **public** repository named `paradigm`.
3. Choose **uploading an existing file** and drag in every file from this folder. Commit.
4. In the repo, open **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
5. After a minute your app is at `https://YOUR-USERNAME.github.io/paradigm/`.

Your data never goes to GitHub. It stays on your phone, plus your own Google Drive once connected.

## 2. Install on the Galaxy S23

1. Open the address above in **Chrome**.
2. Menu (⋮) → **Add to home screen** → **Install**.
3. Launch Paradigm from the home screen. It runs fullscreen and works offline.

## 3. Connect Google Calendar + Drive (~15 min)

1. Go to console.cloud.google.com and create a project named `Paradigm`.
2. **APIs & Services → Library**: enable **Google Calendar API** and **Google Drive API**.
3. **APIs & Services → OAuth consent screen**: choose **External**, fill in the app name and your email. On *Test users*, add your own Gmail address. Leave it in **Testing**.
4. **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - Application type: **Web application**
   - Authorized JavaScript origins: `https://YOUR-USERNAME.github.io`
   - Leave redirect URIs empty. Create, then copy the **Client ID**.
5. In Paradigm, swipe left on the STACK title to open SETTINGS, paste the client ID, and tap **CONNECT GOOGLE**.
6. Google will warn that the app is unverified. Tap **Continue**. It's your own app.

**What to expect:** Google gives browser apps one-hour access. When access has lapsed, the next calendar action (saving an event, completing something) briefly flashes a sign-in window that closes by itself. If Google ever asks you to approve again, tap Continue. When Google can't be reached, Paradigm shows an **ADD TO CALENDAR** button that opens a pre-filled event in one tap.

## Gestures

Swipe right = finger moves left to right. Swipe left = right to left. Screen titles sit at the bottom; swipe on a title to move between screens.

Screens, left to right: **PROJECT BACKLOG · LIST BACKLOG · TASK BACKLOG · STACK · SETTINGS**. FOCUS slides in when you start something and stays until you complete or save it.

| Where | Swipe right | Swipe left | Hold + drag |
| --- | --- | --- | --- |
| STACK title | TASK BACKLOG | SETTINGS | |
| TASK BACKLOG title | LIST BACKLOG | STACK | |
| LIST BACKLOG title | PROJECT BACKLOG | STACK | |
| PROJECT BACKLOG title | STACK | STACK | |
| SETTINGS title | STACK | STACK | |
| STACK block | Start (pick time block) | Send to its backlog (project subtasks return to their project) | Reorder |
| Task or list in a backlog | Add to top of STACK | Delete, or skip if recurring | Reorder |
| Project in PROJECT BACKLOG | Open its subtasks | Delete project | Reorder |
| Project subtask | Add to top of STACK | | Reorder |
| FOCUS, paused | Complete | Back to top of STACK | |
| FOCUS subtask | Check off | | |

On FOCUS, swipe up (or tap ▲ subtasks ▲) to show subtasks or notes; swipe down to hide them.

**Editing anytime:** hold any block (on STACK, a backlog, a project's subtasks, or in FOCUS) and let go. It turns solid green. Swipe it right to open EDIT. Swipe right on EDIT at the bottom to save and go back. Tap a green block to unselect it. Hold and drag still reorders.

New structures land on the top of STACK (lowest priority). The bottom of STACK and of every backlog is the highest priority. Due recurring items drop to the bottom of STACK.

The countdown starts the moment you tap START. When you complete, the Paradigm calendar entry starts at the next 15-minute mark and its length is rounded up to the nearest 15 minutes.

Every send-to-backlog, delete, and subtask check-off shows **UNDO** for 5 seconds.

## Backups

- **Drive:** automatic a few seconds after changes while connected; **RESTORE** in SETTINGS brings it back on a new phone.
- **File:** **EXPORT** / **IMPORT** in SETTINGS saves a `.json` copy on the phone.

## Updating the app

Edit files in the repo, then bump `VERSION` at the top of `sw.js` so phones pick up the change. Close and reopen the app twice.

## Known limits

- The timer can't alert you at zero while the app is fully closed. It vibrates if open and stays accurate either way.
- Start swipes a little inside the screen edges so Android's back gesture doesn't catch them. The Android back gesture closes the current screen.
