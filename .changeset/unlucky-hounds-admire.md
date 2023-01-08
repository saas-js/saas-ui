---
'@saas-ui/modals': patch
'@saas-ui/react': patch
---

Fixed issue where closing dialogs opened by the modals manager to flicker, due to config reset before closing animation was finished.
