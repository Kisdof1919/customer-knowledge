---
id: troubleshooting-nvr-system-time
title: System Time
summary: Troubleshooting guidance for NVR time/date staying at 1970, timezone changes, and PC time synchronization timezone mismatch.
order: 70
keywords: [nvr, system time, 1970, button battery, crystal oscillator, timezone, gmt, dst]
---

## Time and Date Always Stay at 1970-01-01

Button battery failure: The button battery has a service life. When the battery is depleted, it must be replaced. This is especially common for devices that have been kept in stock for a long time.

The function of the button battery is to provide power and form a minimal time synchronization system. When the NVR is powered off, the clock can still keep running and maintain accurate time. Therefore, in this situation, the time can usually be saved manually, but after reboot it changes back to 1970.

If the time cannot be saved correctly and always stays at 1970, the crystal oscillator may have failed.

## NVR Timezone Changes from a Specific Value to GMT+00:00

The timezone changes from a specific value to GMT+00:00.

Check the NVR system log to see whether the timezone was modified by a remote IP address. Then use the IP address to identify the modification source.

## PC Time Synchronization Causes NVR Timezone Mismatch

After synchronizing the PC time from the NVR web interface, the NVR timezone information is inconsistent with the PC timezone.

Disable `Adjust for daylight saving time automatically` on the PC. If daylight saving time needs to be used on the NVR, configure it on the NVR DST page.
