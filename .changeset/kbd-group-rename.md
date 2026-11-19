---
'@saas-ui/cli': patch
---

The `command` registry item is now `kbd-group`, exporting `KbdGroup`. `migrate react-to-registry` maps legacy `Command` imports from `@saas-ui/react` to `KbdGroup`. `KbdGroup` also accepts `Kbd` children and passes its `size` and `variant` to each key.
