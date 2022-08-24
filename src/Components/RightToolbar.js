import React from "react";
import Ad from "./Ad";
import "./RightToolbar.scss";

const RightToolbar = () => {
  const ads = ["../img/default_ad01.jpg", "../img/default_ad02.jpg"];
  return (
    <div className="rightToolbar_container">
      <h2>Zapraszamy do reklamy!</h2>
      {ads.map((ad) => (
        <>
          <Ad className="frame" img={ad} />
        </>
      ))}

      <h2>O aplikacji:</h2>
      <p>
        Aplikacja powstała jako wizualny klon LinkedIn przy użyciu Reacta z Reduxem oraz Google Firebase jako autentykacja użytkownika oraz baza danych. Do definicji styli wykorzystano SASS.
            </p>
      <p>
        Aplikacja w obecnym kształcie posiada podstawowe funkcjonalności: tworzenie użytkownika, publikowania postów, ich komentowanioa oaraz lajkowania.
            </p>
      <p>
        Kod źródłowy aplikacji można znaleźć na moim GitHubie:Aplikacja w obecnym kształcie posiada podstawowe funkcjonalności: tworzenie użytkownika, publikowania postów, ich komentowanioa oaraz lajkowania.
            </p>
    </div>
  );
};

export default RightToolbar;
