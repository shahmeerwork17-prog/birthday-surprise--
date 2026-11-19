# Background Music Assets

The website plays `/audio/romantic-melody.wav` by default (a gentle, original looping waltz-ballad).

## How to Use Your Own Song
1. Place your `.mp3` or `.wav` file inside this folder (`public/audio/`), for example:
   `public/audio/our-song.mp3`
2. Open `src/config/birthdayConfig.ts` and update `music.audioSrc`:
   ```ts
   audioSrc: '/audio/our-song.mp3',
   ```
3. Update `music.trackTitle` with the song name.
