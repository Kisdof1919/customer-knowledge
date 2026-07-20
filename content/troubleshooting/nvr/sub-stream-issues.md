---
id: troubleshooting-nvr-sub-stream
title: Sub-Stream Issues
summary: Sub-stream access limits and stream selection behavior for IPC access.
order: 20
keywords: [nvr, ipc, sub-stream, bitrate, resolution, h264, mpeg4, mjpeg]
---

For IPC sub-stream access, the bitrate must not exceed 2 Mbps and the resolution must not exceed 720p. In this case, reduce the sub-stream bitrate and resolution.

When a third-party IPC is added, the NVR determines the stream type. The default priority is H.264 > MPEG4 > MJPEG. When the encoding format is the same, streams are sorted by the maximum supported resolution.

For example, if the IPC main stream is MPEG4 1080p and the sub-stream is H.264 720p, the NVR will use 720p as the main stream. The MPEG4 1080p sub-stream exceeds the resolution limit and cannot be added. When setting the main stream type, use the priority H.264 > MPEG4 > MJPEG.
