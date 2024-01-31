// Constants and Utils
import { INACTIVE_DAYS } from "../constants/dataConstants";

export const lastUpdateDate = "26/01/2024";

export const sections = [
  {
    key: "section1",
    title: "No Liability",
    content:
      "The InstantSplit application is provided 'as is' without any warranties or guarantees. We, the developers and contributors, are not liable for any damages or losses incurred while using the application. You use InstantSplit at your own risk.",
  },
  {
    key: "section2",
    title: "GroupCode Access",
    content:
      "The core of the application is a unique groupCode per group. This groupCode serves as the key to access a group, eliminating the need for user registrations. All users who have access to a groupCode have the same user rights, essentially group admin rights, within a group.",
  },
  {
    key: "section3",
    title: "Data Purge",
    content: `As a data-sensitive application, we have implemented a data purge policy. If a group remains inactive, i.e., no group information is rendered, added, or changed, for a period of ${INACTIVE_DAYS} days, all its usage data will be permanently purged. This policy is designed to respect your privacy and ensure that only relevant and active data is retained within the application. If you wish to keep the group and its data, you can opt out from that mechanism within the application's settings`,
  },
  {
    key: "section4",
    title: "Privacy",
    content:
      "We use PiratePx, a privacy-respecting, no-cookie, open-source analytics helper. PiratePx does not harvest browsing data, sell ads, or monetize in any way. It cannot identify individual users or user sessions and is solely intended to better understand our users and improve the app accordingly. The related anonymous information is deleted after 30 days. PiratePx has been chosen over typical analytics tools to respect user privacy.",
  },
  {
    key: "section5",
    title: "No Cookies, No Tracking",
    content:
      "We are committed to being as user-friendly and data sensitive as possible. We do not use cookies or tracking mechanisms on our website or application to ensure your privacy all times.",
  },
  {
    key: "section6",
    title: "Local Storage",
    content:
      "InstantSplit utilizes local storage within your browser to provide a convenient user experience. This local storage primarily houses your associated groupCode(s), ensuring seamless functionality without the need for personal identification or registration. In addition, user settings may be stored in local storage to enhance your interaction with the application. When you depart from a group within the application, any related data in local storage will be removed. You also have the option to manually delete this data in your browser's settings, although this action will result in losing access to the group.",
  },
  {
    key: "section7",
    title: "Changes and Updates",
    content:
      "We reserve the right to make changes, updates, or modifications to the InstantSplit application at any time. This includes, but is not limited to, features, functionality, and the terms and conditions themselves. It is your responsibility to review these terms periodically for any updates.",
  },
  {
    key: "section8",
    title: "Sharing GroupCodes",
    content:
      "Be advised to share the groupCode cautiously because anyone with the groupCode can gain full access to your group.",
  },
  {
    key: "section9",
    title: "GroupCode Accessibility",
    content:
      "Please note that there is no way to restore a groupCode. If you and all other group members lose it, the group will no longer be accessible. We cannot provide support in such situations as we, by design, cannot identify our users. This means that your data is ultimately in your hands, and if you happen to lose access to it, it's irrecoverable and will be purged (see Data Purge).",
  },
  {
    key: "section10",
    title: "Indemnification",
    content:
      "You agree to indemnify and hold harmless the developers and contributors of InstantSplit from any claims, losses, or liabilities arising from your use of the application.",
  },
  {
    key: "section11",
    title: "Termination",
    content:
      "We reserve the right to terminate access to the InstantSplit application at our discretion and without notice.",
  },
  {
    key: "section12",
    title: "No Warranty",
    content:
      "We make no warranties or representations about the suitability, reliability, availability, timeliness, and accuracy of the information, software, and services provided by InstantSplit.",
  },
  {
    key: "section13",
    title: "Limitation of Liability",
    content:
      "The developers and contributors of InstantSplit shall not be held liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including, but not limited to, damages for loss of data, profits, use, goodwill, or other intangible losses.",
  },
  {
    key: "section14",
    title: "Entire Agreement",
    content:
      "These terms and conditions constitute the entire agreement between you and InstantSplit concerning your use of the application, superseding any prior or contemporaneous agreements or understandings.",
  },
];
