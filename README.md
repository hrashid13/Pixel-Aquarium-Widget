# Pixel Aquarium 

A cozy pixel art desktop aquarium widget built with Electron. Sits on your desktop below all your windows, just like the old Windows Vista gadgets.

Features a day/night cycle, a little castle, coral, rocks, seaweed, and a school of pixel fish that blink and swim around on their own.



## Installation

### Option A — Download the installer
Head to the [Releases](../../releases) page and download the latest `Pixel Aquarium Setup.exe`. Run it and the aquarium will appear on your desktop automatically.

### Option B — Run from source
You'll need [Node.js](https://nodejs.org) installed.

```bash
git clone https://github.com/hrashid13/Pixel-Aquarium-Widget
cd pixel-aquarium
npm install
npm start
```

To build the installer yourself:
```bash
npm run build
```
The installer will be in the `dist/` folder.

## Usage

The aquarium sits in the bottom-right corner of your desktop by default and is completely click-through — your mouse passes right through it so it never gets in the way.

### Moving it
Hover near the **very top edge** of the aquarium and a small white pill handle will appear. Click and drag it anywhere on your screen.

### Resizing and snapping to corners
The aquarium is controlled from the **system tray** — the icon area on the right side of your Windows taskbar (you may need to click the little **^** arrow to expand hidden icons).

Right-click the tray icon to get the menu:

- **Snap to corner** — instantly move the aquarium to any of the four corners of your screen
- **Resize** — choose between Small (400×250), Medium (600×375), or Large (800×500)
- **Quit** — close the aquarium

### Quitting
Right-click the tray icon on the right side of your taskbar → **Quit**.

## Development

```
pixel-aquarium/
  main.js         — Electron main process, creates the transparent window and tray
  preload.js      — Secure bridge between main process and renderer
  aquarium.html   — All the fish, animations, and canvas rendering
  package.json    — Project config and build settings
```

The aquarium uses a plain HTML5 canvas with no external dependencies. Everything — fish AI, pixel sprites, day/night cycle, decorations — is vanilla JS.

## Disclaimer

It is not perfect yet! I am still working out the kinks and would love feedback on any improvements or suggestions!

## Author

**Built by Hesham Rashid**
- Portfolio: https://www.heshamrashid.org/
- LinkedIn: https://www.linkedin.com/in/hesham-rashid/
- Email: h.f.rashid@gmail.com

Master's in AI and Business Analytics - University of South Florida
