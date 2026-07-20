---
id: troubleshooting-nvr-missing-recording
title: Missing Recording
summary: Common causes of missing recordings on Hikvision NVRs.
order: 50
keywords: [nvr, recording, missing, group, time sync, expire time, overwrite]
---

Hikvision NVRs do not have a function to actively delete recordings.

Common situations include:

- When configuring a group, the channel was not selected.

![Group channel selection](assets/images/nvr/nvr-doc-image-04.png)

- Recording loss caused by multiple devices synchronizing time to the NVR.

If multiple platforms and multiple devices are connected for time synchronization, recording loss may occur. Advise the customer to disable time synchronization from other devices, then check and reconfigure the settings.

- Recording loss caused by `expire time` / `overwrite` settings.

If `expiry time` is configured, recordings will expire. If HDD overwrite is enabled, when the disk is full, the HDD will start overwriting recordings from the earliest recording log.
