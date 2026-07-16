---
id: troubleshooting-camera-blurry-preview
title: Blurry Preview
summary: Troubleshooting steps for blurry camera preview images.
order: 30
keywords: [camera, blurry, preview, bitrate, encoding, tcp, h264+, h265+]
---

1. Check whether the network bandwidth is congested. Insufficient bandwidth may cause video lag and blurry images.
2. Check whether Video Encoding is set to H.264+ or H.265+. If so, disable H.264+/H.265+.
3. Check whether the audio/video parameters are reasonable. Set Bitrate Type to constant, set Image Quality to High, and set Max. Bitrate to 8 Mbps as a reference for a 2 MP device.
4. Set the stream protocol to TCP.
