import "../styles/home.css"
import TCNJ from '../img/TCNJ.png';
import cover from '../img/cover.png';
import gallery1 from '../img/gallery1.png';
import gallery2 from '../img/gallery2.png';
import TCNJ2 from '../img/TCNJ2.png';
import ph from '../img/placeholder.png';
import jm from '../img/jm.jpeg';
import ew from '../img/ew.png';
import ma from '../img/ma.jpeg';
import sc from '../img/sc.png';
import al from '../img/al.png';
import ImageHolder from "../components/ImageHolder";

function aboutUs() {
    return (
        <>
            <p className="aboutSummary"> <br/> The “Visual Culture of Domestic Labor” project evolved from the personal collection of historical trade cards and 
                postcards of <u>Satya Shikha Chakraborty, Assistant Professor of History, at The College of New Jersey</u>. She started 
                collecting back in 2013, while researching the colonial history of Indian ayahs for her PhD. In 2020, while sharing her 
                collection with <u>Joydeep Mitra, Research Assistant Professor of Computer Science, at Stony Brook University</u>, the idea of a 
                collaborative digital history project was born, that would deploy the historical analysis skills of TCNJ History students, 
                and the technological/coding skills of Stony Brook Computer Science students.
                <br/> <br/>
                The History Team from The College of New Jersey: (from left) Sarah Adamo, Sapphire Srigley, Abhishta Tantry, George Kapetanakis, 
                Satya Shikha Chakraborty, Carolyn Carmody, Phoebe Abeles, and Lucy Fleischmann. 
            </p>
            <center><img src={TCNJ} className="tcnjImage"></img></center>
            
            <p className="aboutSummary">The History/ Art History students worked on analyzing the trade cards and postcards, and writing transcripts for the digital exhibition, 
                as part of a group research seminar “Race, Gender, and the Visual Culture of Domestic Labor: Trade Cards and Postcards from the age of New 
                Imperialism, Jim Crow Racism, and Asian Exclusion”, taught by Prof. Chakraborty in Spring 2022. The Seminar culminated in a <u>History Exhibition</u> curated 
                by Prof. Chakraborty and the History/ Art history students at the TCNJ Art Gallery in May 2022.  
            </p>
            <center><img src={cover} className="coverImage"></img></center>
            <br/>
            <center><img src={gallery1} className="galleryImage"></img></center>
            <br/>
            <center><img src={gallery2} className="galleryImage"></img></center>
            <br/>
            <center><img src={TCNJ2} className="tcnjImage"></img></center>
            <br/>
            <p className="aboutSummary"> Computer Science Team from Stony Brook University: </p>
            <center>
                <ImageHolder imgSrc={jm} name = "Professor Joydeep Mitra" email = "jmitra@cs.stonybrook.edu"></ImageHolder>
                <ImageHolder imgSrc={ph} name = "May Me Me Muang" email = "maymememaung27@gmail.com"></ImageHolder>
                <ImageHolder imgSrc={ew} name = "Eric Wang" email = "eric.wang.4@stonybrook.edu"></ImageHolder>
                <ImageHolder imgSrc={sc} name = "Saiansh Chaddha" email = "saiansh.chaddha@stonybrook.edu"></ImageHolder>
            </center>
            <center>
                <ImageHolder imgSrc={ma} name = "Mahir Alam" email = "mahir.alam@stonybrook.edu"></ImageHolder>
                <ImageHolder imgSrc={al} name = "Anna Li" email = "anna.li.5@stonybrook.edu"></ImageHolder>
            </center>
            <p className="aboutSummary">The Computer Science students guided by Professor Mitra worked on digitizing the work that was done by the History team so that 
                the collection of historical post cards and trade cards would be more accessible and interactive.
            </p>
        </>
    );
}

export default aboutUs;