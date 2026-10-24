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

## 4. Glasses: Meta Ray-Ban Display (~15 min, free)

The glasses run their own copy of Paradigm (`glasses.html`) that stays in sync with your phone through a free Firebase database. On the glasses you can do everything except create or rename things: complete, reorder, move between STACK and backlogs, check off subtasks, add project subtasks to STACK, and delete.

**A. Create the sync database (free Spark plan, no card)**
1. Go to console.firebase.google.com → **Create a project** → choose your existing **Paradigm** Google Cloud project (or make a new one). Google Analytics can be off.
2. Left menu: **Build → Realtime Database → Create Database**. Pick a location, choose **Start in locked mode**, and enable it.
3. Open the **Rules** tab, replace everything with this, and tap **Publish**:
```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "paradigm": {
      "$key": {
        ".read": "$key.length >= 32",
        ".write": "$key.length >= 32"
      }
    }
  }
}
```
4. On the **Data** tab, copy the database URL at the top (it looks like `https://paradigm-xxxxx-default-rtdb.firebaseio.com`).
5. In Paradigm on your phone: SETTINGS → **Glasses** → paste the URL → **CONNECT**. It should say *Sync on*.

Your data is stored under a random 32-character key that only your phone and glasses know. Nobody can list or browse the database.

**B. Get the glasses ready**
- Glasses software v125 or newer, and Meta AI app v272 or newer.
- Developer Mode in the Meta AI app: **Settings → App Info**, tap the **App version** five times, then **Enable**.

**C. Pair**
1. Open Paradigm on your phone from its GitHub Pages address (pairing doesn't work from a downloaded file).
2. SETTINGS → **PAIR GLASSES** → **OPEN IN META AI APP**. The Meta AI app opens its add-to-glasses screen; confirm **Paradigm**. It's labeled unverified, which is normal for your own app. Paradigm appears at the bottom of the app grid on your glasses.
3. If that button doesn't open anything: tap **COPY GLASSES LINK**, then in the Meta AI app go to your glasses' settings → **App connections** → **Web apps** → **Add a web app** (on some versions: **App Settings → Apps → Web Apps → Connect Web App**) and paste the link.
4. The QR code on the same screen is the same link, for scanning from another phone or screen.

If the Meta AI app has no Web apps section at all even with Developer Mode on, that's a known Meta issue on some Android versions; updating the Meta AI app and glasses software is the first thing to try.

**Calendar:** the glasses can't sign in to Google, so completions you make there wait on your phone. They're logged to your Paradigm calendar the next time Paradigm is open on your phone and Google is connected (SETTINGS shows any that are waiting, with a **LOG TO CALENDAR** button).

**If both devices change things at the same moment,** the most recent change wins.

### Glasses controls

Swipe right on the touchpad or Neural Band = →. Swipe left = ←. Tap/pinch = Enter. Back = the system Back.

| Where | → | ← | Enter |
| --- | --- | --- | --- |
| Screen name at the bottom | Next screen out: STACK → TASK → LIST → PROJECT BACKLOG (stops there) | Back toward STACK | Jump to STACK |
| STACK block | Complete (set START and END with − / +, then COMPLETE) | Send to its backlog (project subtasks return to their project) | Menu: complete, to backlog, subtasks or notes, move, delete |
| Task or list in a backlog | Add to top of STACK | — | Menu: add to stack, subtasks or notes, move, delete |
| Project in PROJECT BACKLOG | Open its subtasks | — | Menu: subtasks, move, delete |
| Project subtask | Add to top of STACK | — | Add or delete |
| List subtask | Check off (it disappears) | — | Check off |

**MOVE:** choose MOVE in the menu, press ↑ or ↓ to slide the block, then Enter to drop it.

## Gestures

Swipe right = finger moves left to right. Swipe left = right to left. Screen titles sit at the bottom; swipe on a title to move between screens.

Screens, left to right: **PROJECT BACKLOG · LIST BACKLOG · TASK BACKLOG · STACK · SETTINGS**. PROJECT BACKLOG is the end of the row.

| Where | Swipe right | Swipe left | Hold + drag |
| --- | --- | --- | --- |
| STACK title | TASK BACKLOG | SETTINGS | |
| TASK BACKLOG title | LIST BACKLOG | STACK | |
| LIST BACKLOG title | PROJECT BACKLOG | STACK | |
| PROJECT BACKLOG title | (end of row) | STACK | |
| SETTINGS title | STACK | STACK | |
| STACK block | Complete (pick when it happened) | Send to its backlog (project subtasks return to their project) | Reorder |
| Task or list in a backlog | Add to top of STACK | | Reorder |
| Project in PROJECT BACKLOG | Open its subtasks | | Reorder |
| Project subtask | Add to top of STACK | | Reorder |

**Hold, let go, then swipe** (the block turns solid green when held): swipe right to EDIT, swipe left to delete. This works on every block on STACK, in the backlogs, and on a project's subtasks screen. Deleting never adds anything to the calendar. Tap a green block to unselect it.

**EDIT** has no buttons: swipe right on EDIT at the bottom to save and go back. Android's back gesture leaves without saving. Events keep a DELETE EVENT button, since nothing else can remove them.

**Completing:** swipe a STACK block right, then pick when it happened. The block is pre-filled with the half hour ending now; drag the bar at its bottom to change the end, or hold and drag on the day to paint a new span (15-minute steps). COMPLETE adds it to your Paradigm calendar.

**Where things land on STACK:** new things typed into STACK go to the bottom (highest priority). Things added from a backlog go to the top (lowest priority). Due recurring items drop to the bottom. The bottom of every backlog is its highest priority too.

**Completing project subtasks** logs them to the calendar and removes them from the project, unless the project is marked *Recurring project* in EDIT; then they stay, ready to do again.

A block only moves in directions that do something: plain blocks in a backlog can't be swiped left; hold one first (it turns green) to delete it.

Send-to-backlog and delete show **UNDO** for 5 seconds.

## Backups

- **Drive:** automatic a few seconds after changes while connected; **RESTORE** in SETTINGS brings it back on a new phone.
- **File:** **EXPORT** / **IMPORT** in SETTINGS saves a `.json` copy on the phone.

## Updating the app

Upload the new files over the old ones in the repo (same names). GitHub takes a minute or two to publish; the **Actions** tab shows when it's done. Then open Paradigm: it checks for a new version every time it opens and reloads itself once when one arrives. The version number is at the bottom of SETTINGS.

Never use Chrome's *Clear site data* to force an update. It also deletes your stacks and backlogs.

## Known limits

- Start swipes a little inside the screen edges so Android's back gesture doesn't catch them. The Android back gesture closes the current screen.
