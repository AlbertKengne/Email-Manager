// Step 2: Add imports
import React from "react";

const URL_REGEX = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;

export const convertLinksToAnchors = (text: string): JSX.Element[] => {
  if (!text) return [];

  try {
    // Reset regex lastIndex
    URL_REGEX.lastIndex = 0;
    const parts = text.split(URL_REGEX);

    return parts
      .filter((part): part is string => Boolean(part))
      .map((part, index) => {
        // Reset regex lastIndex before test
        URL_REGEX.lastIndex = 0;
        if (URL_REGEX.test(part)) {
          const href = part.startsWith("www.") ? `https://${part}` : part;

          return React.createElement(
            "a",
            {
              key: `link-${index}`,
              href,
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "text-[#20AD96] hover:text-[#f4b18e] underline transition-colors duration-300",
            },
            part
          );
        }

        return React.createElement(
          "span",
          {
            key: `text-${index}`,
          },
          part
        );
      });
  } catch (error) {
    console.error("Error converting links to anchors:", error);
    return [React.createElement("span", { key: "error" }, text)];
  }
};
