// Constants and Utils
import { INACTIVE_DAYS } from "../constants/dataConstants";

export const lastUpdateDate = "01/03/2024";

export const sections = [
  {
    key: "section1",
    title: "Open Source",
    content:
      "InstantSplit is an open-source application, meaning its source code is freely available for anyone to view, modify, and distribute. ",
    link: "https://github.com/felixschmidt89/InstantSpilt",
    linkText: "the GitHub repository",
  },
  {
    key: "section2",
    title: "No Liability",
    content:
      "InstantSplit is provided 'as is' without any warranties or guarantees. We, the developers and contributors, are not liable for any damages or losses incurred while using the application. You use InstantSplit at your own risk.",
  },
  {
    key: "section3",
    title: "GroupCode Access",
    content:
      "The core of the application is a unique groupCode per group. This groupCode serves as the key to access a group, eliminating the need for user registrations. Within the application the groupCode can be accessed, copied and shared manually or programmatically (via the groups invitation link). All users who have access to a groupCode  have the same user rights, essentially group admin rights, within a group.",
  },
  {
    key: "section4",
    title: "No Cookies, No Access Logs, No Tracking Mechanisms",
    content:
      "We are committed to prioritizing user-friendliness and data sensitivity. The InstantSplit application does not use cookies, access logs, or any other tracking mechanisms to ensure your privacy at all times. However, please note that our website host, Netlify, may track access data.",
    link: "https://www.netlify.com/privacy/",
    linkText: "Netlify's Privacy Policy",
  },
  {
    key: "section5",
    title: "Site Protection",
    content:
      "To keep InstantSplit safe from bad actors, we use Friendly Captcha. It solely serves as a security provider and does not retain or utilize any personal information for purposes beyond security, such as marketing.",
    link: "https://friendlycaptcha.com/legal/privacy-end-users/",
    linkText: "Friendly Captcha's Privacy Policy for End Users",
  },
  {
    key: "section6",
    title: "Privacy",
    content:
      "We use PiratePx, a privacy-respecting, no-cookie, open-source analytics helper. PiratePx does not harvest browsing data, sell ads, or monetize in any way. It cannot identify individual users or user sessions and is solely intended to better understand our users and improve the app accordingly. The related anonymous information is deleted after 30 days. PiratePx has been chosen over typical analytics tools to respect user privacy.",
    link: "https://www.piratepx.com/",
    linkText: "PiratePx's website",
  },
  {
    key: "section7",
    title: "Local Storage",
    content:
      "InstantSplit utilizes local storage within your browser to provide a convenient user experience. This local storage primarily houses your associated groupCode(s), ensuring seamless functionality without the need for personal identification or registration. In addition, user settings may be stored in local storage to enhance your interaction with the application. When you depart from a group within the application, any related data in local storage will be removed. You can manually delete this data in your browser's settings, but this will result in losing access to one and possibly all groups depending on your action.",
  },
  {
    key: "section8",
    title: "Data Purge",
    content: `As a data-sensitive application, we have implemented a data purge policy. If a group remains inactive, i.e., no group information is rendered, added, or changed, for a period of ${INACTIVE_DAYS} days, all its usage data will be permanently purged. This policy is designed to respect your privacy and ensure that only relevant and active data is retained within the application. If you wish to keep the group and its data, you can opt out from that mechanism within the application's settings.`,
  },
  {
    key: "section9",
    title: "Changes and Updates",
    content:
      "We reserve the right to make changes, updates, or modifications to the InstantSplit application at any time. This includes, but is not limited to, features, functionality, and the terms and conditions themselves. It is your responsibility to review these terms periodically for any updates.",
  },
  {
    key: "section10",
    title: "Sharing GroupCodes",
    content:
      "Be mindful when sharing a groupCode, as it grants full access to the group to anyone who receives it.",
  },
  {
    key: "section11",
    title: "Loss of GroupCode",
    content:
      "Please note that there is no way to restore a groupCode. If you and all other group members lose it, the group will no longer be accessible. We cannot provide support in such situations as we, by design, cannot identify our users. This means that your data is ultimately in your hands, and if you happen to lose access to it, it's irrecoverable and may be purged (see Data Purge).",
  },
  {
    key: "section12",
    title: "Indemnification",
    content:
      "You agree to indemnify and hold harmless the developers and contributors of InstantSplit from any claims, losses, or liabilities arising from your use of the application.",
  },
  {
    key: "section13",
    title: "Termination",
    content:
      "We reserve the right to terminate access to the InstantSplit application at our discretion and without notice.",
  },
  {
    key: "section14",
    title: "No Warranty",
    content:
      "We make no warranties or representations about the suitability, reliability, availability, timeliness, and accuracy of the information, software, and services provided by InstantSplit.",
  },
  {
    key: "section15",
    title: "Limitation of Liability",
    content:
      "The developers and contributors of InstantSplit shall not be held liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including, but not limited to, damages for loss of data, profits, use, goodwill, or other intangible losses.",
  },
  {
    key: "section16",
    title: "Entire Agreement",
    content:
      "These terms and conditions constitute the entire agreement between you and InstantSplit concerning your use of the application, superseding any prior or contemporaneous agreements or understandings.",
  },
];
