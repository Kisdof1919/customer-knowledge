---
id: troubleshooting-nvr-smart-event-search
title: Smart Event Search
summary: Conditions required for Smart Event Search for motion detection, line crossing, and intrusion events.
order: 40
keywords: [nvr, smart event search, vca, dual-vca, motion detection, line crossing, intrusion]
---

Smart Event Search can search the following event types: motion detection, line crossing, and intrusion detection.

On the device local interface, `Save Camera VCA Data` must be enabled in the storage module. For line crossing and intrusion detection, `Dual-VCA` must be enabled. After it is enabled, Smart Event Search can be used regardless of whether the event itself is enabled.

Motion detection is special. The motion detection event must be enabled on the device, and `Enable Dynamic Analysis for Motion` must also be enabled, but `Dual-VCA` does not need to be enabled.

## Information Collection

- Confirm whether `Save Camera VCA Data` is enabled on the local interface.

GUI:

![Save Camera VCA Data setting](assets/images/nvr/nvr-doc-image-01.png)

- Confirm whether the motion detection event is enabled, and whether `Enable Dynamic Analysis for Motion` is enabled.

![Enable Dynamic Analysis for Motion setting](assets/images/nvr/nvr-doc-image-02.png)

- Confirm whether `Dual-VCA` is enabled on the camera. In most cases, it is not enabled on the camera side, which causes intrusion detection and line crossing to fail.

![Dual-VCA setting](assets/images/nvr/nvr-doc-image-03.png)
