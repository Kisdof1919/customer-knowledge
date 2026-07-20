---
id: troubleshooting-nvr-ipc-offline
title: IPC Offline
summary: Troubleshooting guidance for IPC disconnection from an NVR, especially power-related disconnection.
order: 10
keywords: [nvr, ipc, offline, disconnect, poe, power, infrared, heater]
---

1. Check whether the IPC is powered off when it goes offline, and whether it only goes offline in a specific environment. For example, when the IPC enables infrared or the heating module, the required power increases and may cause the IPC to go offline. Disable high-power-consumption functions as appropriate, or power the IPC separately.

The following checks can help determine whether the issue is power-related:

- If both the PoE indicator and the IPC power indicator are off, it is a power supply issue.
- Compare the channel PoE port power on the NVR local interface with the IPC PoE power. If the difference is very large, it is a power supply issue.
- Power the PoE camera separately and add the camera again. If the image is displayed normally, it is a power supply issue.
