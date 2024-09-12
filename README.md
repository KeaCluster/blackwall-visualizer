# Blackwall Visualizer

<!--toc:start-->

- [Blackwall Visualizer](#blackwall-visualizer)

  - [About](#about)
    - [Stack](#stack)
    - [Features](#features)
  - [How to](#how-to) - [Other](#other) - [Controls](#controls)

  <!--toc:end-->

## About

A work in progress audio visualizer,
based upon the aesthetics of Cyberpunk's 2077 the Blackwall.

### Stack

- React
- React three fiber
- three.js
- Tailwind
- Vite

### Features

- Main `fileUploader` component.
- Simple `mediaControl` component.
- Custom Hooks
  - `useAudioPlayer`: Handles the main audio Buffer playback logic and context.
  - `useAnimationFrame`: Handles animation frames and syncs through `useRef`.
- `Bars` component.
  - So far so good

## How to

Clone (or fork and clone) this repo to your local pc.

```sh
 git clone <url>
```

Access the folder and then install necessary npm dependencies.

```sh
cd blackwall-visualizer
npm install
```

Then run the vite server and check your browser.

```sh
npm run dev
```

After that just follow the instructions of the UI.
Upload a `.mp4` or any audio file (within reasonable size)
and enjoy.

### Other

#### Controls

`three.js` and `react-three/fiber` allow for control of the scene.

Use your mouse to control the camera and move around:

- `Hold leftClick` to move the camera _around_ the main component in the scene.
- `Hold rightClick` to move the main component _around_ from the camera's position.
- `scrollWheel` to make the scene bigger or smaller.
