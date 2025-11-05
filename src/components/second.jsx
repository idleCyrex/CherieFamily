import React from "react";
import wave from "../assets/img/1.png";
import { useTranslation } from "react-i18next";

function Second() {
  const { t } = useTranslation();

  return (
    <div>
      <img src={wave} alt="wave" className="wave_img unselectable" />
      <div id="second" className="second_container">
        <div className="second_wrapper">
          <span
            className="second_desc"
            dangerouslySetInnerHTML={{ __html: t("second.p1") }}
          />
          <span
            className="second_desc"
            dangerouslySetInnerHTML={{ __html: t("second.p2") }}
          />
          <span
            className="second_desc"
            dangerouslySetInnerHTML={{ __html: t("second.p3") }}
          />

          <a href="/Menu Cherie at Sea.pdf" download="Menu Cherie at Sea.pdf">
            <button className="button">
              <span>{t("menu")}</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Second;
