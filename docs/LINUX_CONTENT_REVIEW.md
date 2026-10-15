# Linux UX and content review — 2026-10-15 KST

## Product changes

The Linux entry is now a single first lesson with the existing approved headphones mascot. A dedicated guided page presents concept, example, independent task and transfer sequentially. Optional concept quizzes, filesystem/search missions, condition traces and Bash writing are selected one tool at a time in the practice library.

## Rights risk addressed

- Removed the `NVIDIA AI Campus · STEP 1` public header and AI Robotics course framing. Main entry now links directly to Meowde Linux home.
- Removed legacy exercise text, datasets and ZIP/README/check.sh-dependent instructions from robotics.html. Removed the source-derived prompts in assets/linux-lab-v2.js rather than merely hiding them or adding a disclaimer.
- Existing robotics.html route is now a read-only viewer of the original `meowde-linux-robotics-v1` records. No key migration, deletion or write is performed. Old task IDs are shown as neutral numbered records rather than attaching old completion records to newly authored tasks.
- The new first lesson uses a newly written cat/photo-folder scenario and generic Linux concepts. It does not distribute a training provider's files or answer keys. The current course library has no institution branding or external ZIP dependencies.
- Added content-notice.html explaining that this is independent learning, not an official institution course/certification, and describing simulator limits.

## Basis and limitations

NVIDIA's official brand guidance prohibits branding that implies an unapproved affiliation, endorsement or sponsorship: https://www.nvidia.com/en-us/about-nvidia/legal-info/logo-brand-usage/

NVIDIA's legal notices distinguish trademarks and copyrighted site materials: https://www.nvidia.com/en-us/about-nvidia/legal-info.html

This change removes identifiable branding and unverified source-derived public content from the proposed current version. It is not a legal finding that prior or remaining assets are licensed. The original training materials, provider contracts, historical repository commits, and rights to the existing approved mascot were not independently cleared. The mascot is reused from the established application asset; no new ownership claim or license is assigned. Historical Git content, forks and prior deployments are not erased. Production continues to serve its existing version until a separately authorized release.

The repository's meowde-progress-fixed.zip contains an old app archive (index.html, vercel.json, README.md), not the referenced Linux course ZIP. It is not used by the new learning route.

## Release considerations

PR #75/#76 target legacy robotics exercise behavior that this proposal retires. Do not combine those changes automatically or reintroduce their old exercise corpus. Reassess them against the new product scope. No main merge or production deployment is performed here.

Before a commercial release, verify the provenance and license of third-party visual assets and any future imported content. Content entry should record author/source/license and any institutional permission. Keep public branding independent unless actual permission is documented.
