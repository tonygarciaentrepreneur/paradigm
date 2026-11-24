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

## How Paradigm 2.0 works

**Difficulty (1–4)** is how much something weighs: its height in rows on STACK (dashed lines mark the rows) and how much it counts when completed. In backlogs it's the row of little squares on the right. Lists have one difficulty; a project's subtasks each have their own.

**MOMENTUM** at the top of STACK is today's score: it starts at 0 each day and rises by the difficulty of each task you complete.

**CAPACITY** (shown on SCHEDULE) is your 7-day average of difficulty completed, rounded down. STACK can't hold more difficulty than your capacity: when it's full, new things wait. RESET in SETTINGS starts capacity over from a number you pick.

**Carry-over:** anything still on STACK at midnight turns **red**. A red block can be completed, or it has to go through SUPPORT: trying to send it to backlog, schedule it or delete it opens SUPPORT instead.

**Adding something:** type a name and press enter, set **Difficulty** by dragging across the four blocks, then swipe the block: **right = STACK** (the bottom, as the new active block; blocked if it won't fit) or **left = BACKLOG**. Typing the exact name of something you have opens it.

**The active block** is the bottom of STACK (triangles point at its bottom row). Swipe it right to complete it. If it still has open subtasks, those open first.

| | Swipe right | Swipe left | In FOCUS, swipe right | In FOCUS, swipe left |
| --- | --- | --- | --- | --- |
| Active block | Complete | To backlog | SUPPORT | Delete |
| Other STACK blocks | Schedule (pick a day) | To backlog | SUPPORT | Delete |
| Backlog items | Add to the top of STACK | (nothing) | SUPPORT | Delete |

**FOCUS:** hold a block and let go; it turns green and the screen name reads FOCUS. Swipe left on the **FOCUS** name itself to open the block's detail screen. Tap the block again to leave FOCUS. Hold and drag reorders.

**Detail screen:** a **Project** switch at the top (swipe it right for on, left for off), with **Difficulty** below it; subtasks pile up from the bottom with the entry box above the name. A task shows notes until it gets subtasks (then it's a list). Tap the name to rename it. Swipe left on the name to save and go back; swipe right to save and add it to STACK.

**SUPPORT:** swipe right on the one that fits. **TIRED** (physical energy), **STUCK** (mental energy: what does done look like, then the first step), **DREAD** (emotional energy: the smallest part you could face for 5 minutes). Each ends the same way: add the pieces, each with its own difficulty, then swipe right on the name. The original becomes a project in PROJECT BACKLOG and the pieces ("Original: Piece") take its place on STACK, as many as fit. TIRED starts you with "Choose Best Time".

**Scheduling** (pick a day from tomorrow on) turns it into an all-day event on your Paradigm calendar; it comes back onto STACK that morning with its subtasks and size.

**Today's calendar:** the first open of the day brings today's events to the bottom of STACK: timed ones at the very bottom in time order (sized by length: 30 min = 1, 1 hr = 2, 2 hr = 3, longer = 4), then all-day ones. What doesn't fit waits at the top of its backlog. Repeating things live in Google Calendar now; Paradigm no longer has its own recurring option.

## Backups

- **Drive:** automatic a few seconds after changes while connected; **RESTORE** in SETTINGS brings it back on a new phone.
- **File:** **EXPORT** / **IMPORT** in SETTINGS saves a `.json` copy on the phone.

## Updating the app

Upload the new files over the old ones in the repo (same names). GitHub takes a minute or two to publish; the **Actions** tab shows when it's done. Then open Paradigm: it checks for a new version every time it opens and reloads itself once when one arrives. The version number is at the bottom of SETTINGS.

Never use Chrome's *Clear site data* to force an update. It also deletes your stacks and backlogs.

## Known limits

- Start swipes a little inside the screen edges so Android's back gesture doesn't catch them. The Android back gesture closes the current screen.
