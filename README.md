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

### Glasses

The glasses are a viewer for STACK: difficulty as rows, the active block marked, carry-overs in red, and MOMENTUM at the top. **Enter** on a block opens its subtasks; **→** swipes one off (completes it). **Back** closes. Everything else happens on the phone.

## How Paradigm works (3.0)

**Screens**, left to right: **RECOVERY · SETTINGS · PROJECT · LIST · TASK BACKLOG · SCHEDULE · STACK · FOCUS · SUPPORT**. Swipe right on a screen name to go further left; from any screen left of STACK, swipe left to snap straight back to STACK. To the right of STACK you step through: STACK ← FOCUS ← SUPPORT and back.

**MOMENTUM** (centered at the top of STACK) is today's score: it starts at 0 each day and rises by the difficulty of each task you complete (+1 for each DIVIDE & CONQUER). Swipe right on it for **HISTORY** (each day's score on a calendar; swipe left on HISTORY to return) or left for **GRAPH** (a line chart; swipe right on GRAPH to return). Anything still on STACK at midnight takes its difficulty off that day's score. Sending to backlog, scheduling, bumping or deleting doesn't change MOMENTUM.

**Difficulty (1–4)** is a block's height in rows on STACK and its points. **CAPACITY** limits how much STACK holds: the average MOMENTUM of your last 4 days on the same weekday (past Tuesdays on a Tuesday), rounded down. Until there's a matching day it uses your recent days, then your RESET number. RESET in SETTINGS restarts it without touching HISTORY.

**The active block** (bottom of STACK, triangles point at it) is the only one that leaves STACK by swiping:

| | Swipe right | Swipe left |
| --- | --- | --- |
| Active block | Complete (+difficulty; finish open subtasks first) | Bump to tomorrow |
| Active block, highlighted | Delete | Pick a day (or BACKLOG at the top) |
| Other blocks | (hold and drag to reorder) | |

**Highlighting** (hold a block and let go) turns the screen name into **FOCUS**:
- swipe right on FOCUS: **SCHEDULE**, to place it at a time today. It stays on STACK and moves to the bottom when that time comes;
- swipe left on FOCUS: its **FOCUS** screen (notes or subtasks, difficulty). Swipe left again for **SUPPORT**.
Tap the block again to un-highlight. With nothing highlighted, swipe right on STACK for SCHEDULE, or left for the active block's FOCUS screen, which adds a **timer** (leaving pauses it; the time is kept).

**SUPPORT:** two questions, then **DIVIDE & CONQUER**: what will help becomes the task's bottom subtask, what's preventing it goes into its notes, and MOMENTUM gets +1.

**Repeats:** every time a task lands on STACK counts once, and every midnight it's still there counts again. At 3 it gets yellow ⚠ signs on both sides of its name. Swipe a ⚠ block right (active or not) for **REPEAT DETECTED**: **REQUIRES SUPPORT** (SUPPORT) or **REQUIRES SYSTEM** (BUILD SYSTEM: pick how often, and it becomes a recurring event on your Paradigm calendar). Either one clears the ⚠.

**Adding something:** type a name, set Difficulty, then swipe the block right (STACK, at the bottom) or left (BACKLOG). **Backlog items:** swipe right to add to the top of STACK, left to delete. Highlight one and the screen name reads FOCUS: swipe right on it to schedule the item for a day, or left for its memory screen. Projects: swipe right for their subtasks, left to delete.

**Today's calendar** comes onto the bottom of STACK on the first open of the day (timed events sized by length, then all-day ones).

## Backups

- **Drive:** automatic a few seconds after changes while connected; **RESTORE** in SETTINGS brings it back on a new phone.
- **File:** **EXPORT** / **IMPORT** in SETTINGS saves a `.json` copy on the phone.

## Updating the app

Upload the new files over the old ones in the repo (same names). GitHub takes a minute or two to publish; the **Actions** tab shows when it's done. Then open Paradigm: it checks for a new version every time it opens and reloads itself once when one arrives. The version number is at the bottom of SETTINGS.

Never use Chrome's *Clear site data* to force an update. It also deletes your stacks and backlogs.

## Known limits

- Start swipes a little inside the screen edges so Android's back gesture doesn't catch them. The Android back gesture closes the current screen.
