---
id: troubleshooting-nvr-hdd
title: HDD Issues
summary: HDD troubleshooting steps including SMART test, SATA cable checks, and power supply checks.
order: 30
keywords: [nvr, hdd, hard disk, smart, sata, power supply, reallocated sector count]
---

When an HDD issue occurs, perform a SMART test first.

## SMART Test

If the SMART test shows an abnormal result, replace the HDD. The SMART test can be performed on the NVR local interface. If the device has not created a RAID array, the SMART test can also be performed from the web interface.

If `self-evaluation` fails, the HDD has not passed the SMART test. Pay close attention to `Reallocated Sector Count`. If the value is `1`, it means the HDD is currently in the worst condition. In this case, replace the HDD, perform SMART tests on the remaining disks, and replace any problematic HDDs in time.

## SATA Cable Check

Cross-check the SATA cables. For example, swap the third cable with the fourth cable, and the first cable with the fifth cable. If the offline HDD slot changes after swapping the SATA cable, replace the SATA cable.

## Power Supply Check

Check whether the HDD is spinning and whether the HDD indicator on the front panel is lit.

If the HDD is not spinning and the HDD indicator on the front panel is not lit, it can be determined that the HDD power supply is abnormal.
