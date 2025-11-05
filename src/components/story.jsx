import React from "react";
import { useTranslation } from "react-i18next";

function Story() {
  const { t } = useTranslation();

  return (
    <div className="story_container">
      <div className="story_wrapper">
        <span className="story_desc">{t("story.p1")}</span>
        <span className="story_desc">{t("story.p2")}</span>
        <a
          href="/Menu Cherie at Sea.pdf"
          download="Menu Cherie at Sea.pdf"
          className="story_desc_highlight"
        >
          {t("story.cta")}
        </a>
      </div>
    </div>
  );
}

export default Story;
