import React from 'react';
import img1 from '../Components/Assets/t1.jpg';
import img2 from '../Components/Assets/t3.jpg';
import img3 from '../Components/Assets/t8.jpg';
import img4 from '../Components/Assets/t5.jpg';
import img5 from '../Components/Assets/t7.jpg';
import img6 from '../Components/Assets/t6.jpg';
import img7 from '../Components/Assets/t2.jpg';
import './CSS/Blog.css';

const Blog = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Bine ați venit în lumea Little Heaven!</h1>
      </header>
      <section className="content">
        <div className="card">
          <img src={img1} alt="Macarons" className="small-image left" />
          <div className="text right">
            <p>Sunt încântat să împărtășesc cu tine povestea noastră, o călătorie plină de pasiune și dedicare începută în 2020. Eu sunt Bartis Andrea fondatorul și inima din spatele acestei afaceri mici dar pline de dragoste.</p>
          </div>
        </div>
        <div className="card">
          <img src={img2} alt="Cake" className="small-image right" />
          <div className="text left">
            <p>Într-o lume plină de agitație și stres, am simțit mereu că ceva lipsește. Așa că, într-o zi de vară în 2020, am decis să aduc un strop de fericire și bucurie în viețile oamenilor. Astfel, Little Heaven s-a născut din visul meu de a crea locuri de refugiu dulci, unde oamenii pot găsi confort și sărbătoare în cele mai mici lucruri.</p>
          </div>
        </div>
        <div className="card">
          <img src={img3} alt="Macarons" className="small-image left" />
          <div className="text right">
            <p>De atunci, ne-am dedicat să oferim clienților noștri nu doar produse de înaltă calitate, ci și experiențe memorabile. Torturile noastre delicioase, prăjiturile cu creme și îmbietare și deserturile sunt rezultatul muncii noastre pasionale și a atenției la detalii.</p>
          </div>
        </div>
        <div className="card">
          <img src={img4} alt="Cake" className="small-image right" />
          <div className="text left">
            <p>La Little Heaven, credem în magia lucrurilor mici. Fiecare tort sau prăjitură este realizat cu dragoste și atenție la fiecare ingredient, pentru a oferi o experiență gastronomică autentică și plină de savoare.</p>
          </div>
        </div>
        <div className="card">
          <img src={img5} alt="Macarons" className="small-image left" />
          <div className="text right">
            <p>Cu fiecare an care trece, ne-am consolidat poziția în comunitatea noastră și am devenit un punct de referință pentru cei care caută un moment de răsfăț și încântare. Suntem mândri că am creat un mic colț de rai pentru toți cei care prețuiesc și își doresc nesfârșite experiențe dulci.</p>
          </div>
        </div>
        <div className="card">
          <img src={img6} alt="Cake" className="small-image right" />
          <div className="text left">
            <p>Așadar, te invit să alături călătoriei noastre la Little Heaven și să descoperi bucuria în cele mai mici detalii. Cu fiecare desert savurat, să știi că ești într-un anumit fel parte din mică noastră poveste!</p>
            <p>Mulțumesc că faci parte din povestea noastră!</p>
          </div>
        </div>
        <div className="card">
          <img src={img7} alt="Cake" className="small-image left" />
          <div className="text right">
            <h2>Rețeta Săptămânii: Tort de Ciocolată</h2>
            <p>Astăzi vă împărtășim rețeta noastră secretă pentru un tort de ciocolată delicios. Ingredientele sunt simple, dar rezultatul este deosebit! Descoperă cum să faci acest desert incredibil la tine acasă.</p>
            <ul>
              <li>200g făină</li>
              <li>200g zahăr</li>
              <li>200g unt</li>
              <li>4 ouă</li>
              <li>100g ciocolată neagră</li>
              <li>100ml lapte</li>
              <li>1 linguriță praf de copt</li>
            </ul>
            <p><em>Instrucțiuni: Preîncălzește cuptorul la 180°C. Amestecă untul și zahărul până devin cremoase, apoi adaugă ouăle unul câte unul. Într-un alt bol, amestecă făina cu praful de copt. Topește ciocolata și adaug-o împreună cu laptele în amestecul de unt și zahăr. Adaugă treptat făina. Toarnă amestecul într-o tavă și coace pentru 30-35 de minute. Lasă să se răcească înainte de a servi.</em></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
