import React from "react";
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (12)</div>

            </div>
            <div className="descriptionbox-description">
                <p>
                Echipa noastră de cofetari și patiseri este formată din profesioniști pasionați de arta culinară. Fiecare produs este creat cu măiestrie și atenție la detalii, transformând fiecare ocazie într-o experiență memorabilă.
                </p>
                <p>
                Comandând de la Little Heaven, te bucuri de o experiență culinară de neuitat, cu deserturi care îți îndulcesc zilele speciale și îți aduc un strop de fericire. Alege Little Heaven pentru torturi și prăjituri ce vor încânta simțurile tale și ale celor dragi!
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox