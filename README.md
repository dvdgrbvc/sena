# Sena Şener

A buildless artist website in Turkish, retaining the original film, artist label and Volina typeface. The visual direction is Anatolian soul, vintage record artwork, and jazz club warmth.

## Release

**Alışılır mı Aşka — 11 September 2026, 00:00 in Turkey (UTC+3).** This equals 10 September 2026 at 21:00 UTC. The song title is visible before release. The page describes an album being released song by song, without claiming that the entire album is available.

`index.html` contains the release time in `#release-date[datetime]`. `site.js` reads that value and automatically replaces the countdown and release labels at midnight, including for visitors who leave the page open or return to a suspended tab. No scheduled deployment or service is needed. Timing uses the visitor's device clock.

The retained background clip is labeled **Aşkından Ölmemeli** so it is not presented as the new single's music video. It starts muted. The visitor can enable sound or pause the film. Reduced motion and data saver settings prevent automatic video loading/playback. The existing poster remains visible when playback is unavailable.

## Listening destinations

Spotify, Apple Music and YouTube point to the original artist profiles/channel and are explicitly labeled as artist pages. No unverified single URLs or pre-save links are used. When confirmed single URLs are available, the release-specific calls to action can be linked directly to them; keep artist-profile destinations in the listening section.

## Files and deployment

- `index.html`: content, release timestamp and metadata.
- `styles.css`: responsive layout and typography.
- `site.js`: release state and explicit media controls.
- `assets/`: original media, fonts, logo and icons; unchanged.

There are no package dependencies or build steps. Serve the repository root with any static web host. Keep `styles.css` and `site.js` alongside `index.html` when deploying. The existing Open Graph image is preserved.

## Validation

Run `node --check site.js` and `node --test tests/site.test.cjs` (Node 18+). Tests cover the exact release boundary, opening after release, suspended tabs, explicit sound control, reduced motion/data saver behavior, blocked/failed media, and local assets/navigation. These are script and static checks, not browser rendering tests.

## Future releases

Update the visible song title, title/description metadata, the release timestamp and date labels, and the album's release list together. Keep the explicit timezone offset. The current copy is tailored to this September release, so update the pre-release text in `site.js` as well. Do not announce unreleased track names or dates without confirmation.
