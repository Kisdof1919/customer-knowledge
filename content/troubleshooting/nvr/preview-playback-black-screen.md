---
id: troubleshooting-nvr-preview-playback-black-screen
title: Preview/Playback Failed
summary: Troubleshooting guidance for remote preview or playback failure and black screen issues.
order: 60
keywords: [nvr, preview, playback, failed, black screen, tcp, udp, multicast, plugin, firewall]
---

It is recommended to switch the protocol first.

During NVR remote preview, the protocol can be selected from TCP, UDP, and Multicast. If the user has high real-time requirements, use UDP. If the user has high integrity requirements, use TCP. Try switching the protocol first.

Sometimes the router or PC firewall restricts TCP connections. Try increasing the TCP wait time on the router, canceling TCP blocking, or directly switching to UDP.

If switching the protocol does not resolve the issue:

- Uninstall the plugin, log in to the device web interface again, and reinstall the plugin.
- Reduce the number of users pulling streams.
- Check the antivirus software or firewall blocking records. Disable the antivirus software or firewall and compare the result.
