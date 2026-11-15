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

**What to expect:** Google gives browser apps one-hour access. When access has lapsed, the next calendar action (saving an event, scheduling something, REFRESH on SCHEDULE) briefly flashes a sign-in window that closes by itself. If Google ever asks you to approve again, tap Continue. When Google can't be reached, Paradigm shows an **ADD TO CALENDAR** button that opens a pre-filled event in one tap.

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

**Calendar:** the glasses can't sign in to Google. Things you schedule there wait on your phone and are added to your Paradigm calendar the next time Paradigm is open on your phone with Google connected (SETTINGS shows any that are waiting, with a **LOG TO CALENDAR** button). The glasses' SCHEDULE screen shows today's calendar as your phone last loaded it, so open SCHEDULE on the phone to refresh it.

**Sync never writes over changes a device hasn't seen.** Before saving, each device checks the server. If the other device has changed things since, it takes that version instead (and says so, so you can redo your last change). A device that can't reach the server waits and retries rather than writing blind. So glasses waking up with an old copy, or a fresh install, can't overwrite your newer data.

### Glasses controls

Swipe right on the touchpad or Neural Band = →. Swipe left = ←. Tap/pinch = Enter. Back = the system Back.

Screens: **PROJECT BACKLOG · LIST BACKLOG · TASK BACKLOG · STACK · SCHEDULE**.

| Where | → | ← | Enter |
| --- | --- | --- | --- |
| Screen name at the bottom | Toward SCHEDULE (stops there) | Out to TASK → LIST → PROJECT BACKLOG (stops there) | Jump to STACK |
| STACK block | Complete (it leaves STACK; nothing goes on the calendar) | Send to its backlog (project subtasks return to their project) | FOCUS menu |
| Task or list in a backlog | Add to top of STACK | — | FOCUS menu |
| Project in PROJECT BACKLOG | Open its subtasks | — | FOCUS menu |
| Project subtask | Add to top of STACK | — | Add, schedule or delete |
| List subtask | Complete (it disappears) | Delete | Complete |

**FOCUS menu** (the phone's hold): SCHEDULE (pick a time today with − / +; it stays on STACK), TO BACKLOG or ADD TO STACK, SUBTASKS or NOTES, MOVE (↑ ↓ then Enter), DELETE.

## Gestures (phone)

Swipe right = finger moves left to right. Swipe left = right to left. Screen names sit at the bottom; swipe on a name to move between screens.

Screens, left to right: **PROJECT BACKLOG · LIST BACKLOG · TASK BACKLOG · STACK · SCHEDULE · SETTINGS · RECOVERY**. Each end of the row is a hard stop.

| Where | Swipe right | Swipe left | Hold + drag |
| --- | --- | --- | --- |
| STACK name | TASK BACKLOG | SCHEDULE | |
| Backlog names | Next backlog out (stops at PROJECT BACKLOG) | Straight back to STACK | |
| SCHEDULE name | STACK | SETTINGS | |
| SETTINGS name | Straight back to STACK | RECOVERY | |
| RECOVERY name | Straight back to STACK | (end of row) | |
| STACK block | Complete (it leaves STACK; nothing goes on the calendar) | Send to its backlog (project subtasks return to their project) | Reorder |
| Task or list in a backlog | Add to top of STACK | | Reorder |
| Project in PROJECT BACKLOG | Open its subtasks | | Reorder |
| Project subtask | Add to top of STACK | | Reorder |

**FOCUS:** hold a block and let go. It turns solid green and the name at the bottom reads **FOCUS**. Then:
- swipe the block **right** to open the activity's own screen;
- swipe the block **left** to delete it (never touches the calendar);
- swipe **left on FOCUS** (toward SCHEDULE) to plan where it fits today: drag the block to move it, drag the bar below it to change the length, then swipe right on **SCHEDULE** at the bottom to add it to your Paradigm calendar, or left to cancel. The activity stays where it was.
Tap a green block, or anywhere else, to leave FOCUS. FOCUS works the same in the backlogs.

**The activity's screen** works like STACK: subtasks pile up from the bottom, the entry box sits above the name at the bottom, swipe a subtask right to complete it or left to delete it, hold and drag to reorder. Tasks show their notes instead. OPTIONS at the top has the name and recurring settings. Swipe **left** on the name to save and go back; swipe **right** to save and add it to STACK. Android's back gesture leaves without saving. Searching for something opens this same screen.

**SCHEDULE** shows today's calendar (your main calendar plus Paradigm). **CALENDAR** at the top opens the Google Calendar app to edit events. REFRESH reloads it.

**RECOVERY** lists earlier versions of your Drive backup (newest first). INSPECT shows what a version holds; RESTORE THIS VERSION replaces everything in Paradigm with it (and your glasses on their next sync), or DOWNLOAD saves it as a file you can IMPORT later. Inspecting marks that version *Keep Forever* in Drive, which Google requires before downloading it and which also stops it being auto-deleted. Google keeps old versions for about 30 days.

**Where things land on STACK:** things added from the STACK screen (typed in, or from search) go to the bottom (highest priority). Things added from a backlog go to the top (lowest priority). Due recurring items drop to the bottom. The bottom of every backlog is its highest priority too.

**Completing project subtasks** removes them from the project, unless the project is marked *Recurring project* (in OPTIONS); then they stay, ready to do again.

A block only moves in directions that do something: plain blocks in a backlog can't be swiped left; hold one first (FOCUS) to delete it.

Send-to-backlog, complete, and delete show **UNDO** for 5 seconds.

## Backups

- **Drive:** automatic a few seconds after changes while connected; **RESTORE** in SETTINGS brings it back on a new phone.
- **File:** **EXPORT** / **IMPORT** in SETTINGS saves a `.json` copy on the phone.

## Updating the app

Upload the new files over the old ones in the repo (same names). GitHub takes a minute or two to publish; the **Actions** tab shows when it's done. Then open Paradigm: it checks for a new version every time it opens and reloads itself once when one arrives. The version number is at the bottom of SETTINGS.

Never use Chrome's *Clear site data* to force an update. It also deletes your stacks and backlogs.

## Known limits

- Start swipes a little inside the screen edges so Android's back gesture doesn't catch them. The Android back gesture closes the current screen.
