# Custom Photos

To display your own photos in the Hero or Cherished Moments section:
1. Place your image files (`.jpg`, `.png`, `.webp`) in this folder (`public/images/`).
2. Open `src/config/birthdayConfig.ts` and set `media.heroImageSrc` or each item's `imageSrc` inside `media.memories` to `"/images/your-photo.jpg"`.
3. Whenever an image path is left empty (`""`), the site renders an original romantic botanical illustration so there are never broken image frames.
