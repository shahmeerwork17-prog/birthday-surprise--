# Custom Video Background

To use a looping romantic video behind the Birthday Welcome screen:
1. Place an `.mp4` or `.webm` file in this folder (`public/video/`), e.g. `public/video/roses.mp4`.
2. Open `src/config/birthdayConfig.ts` and set `media.heroVideoSrc` to `"/video/roses.mp4"`.
3. If `heroVideoSrc` is empty or fails to load, the site gracefully displays the animated velvet-rose backdrop.
