---
id: troubleshooting-camera-missing-recording
title: Missing Recording
summary: Troubleshooting steps for missing segments in continuous SD card recording.
order: 50
keywords: [camera, recording, missing, sd card, i frame, frame rate]
---

If continuous recording is configured but recording is interrupted during certain time periods while the SD card status shows no abnormality, use the following checks.

![Missing recording example](assets/images/camera/camera-doc-image-05.png)

1. First confirm the SD card specifications and compatibility.
2. Then try adjusting the I-frame interval or video frame rate. As a reference, set the I-frame interval to about twice the frame rate. The issue may be related to insufficient recording buffer.
