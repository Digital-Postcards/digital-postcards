import React, {useState} from "react";
import "../styles/home.css"
import CustomPostcardCarousel from "../components/reactCarouselWrapper";
import PopUp from "../components/popup";

export default function Home(props){
    let chosenPostcards = [];
    if(props.postcardData !== null){
        for(let i = 0; i < 7; i++){
            chosenPostcards.push(props.postcardData[i]);
            //If already in, then redo the number
        }
    }
    else{
        chosenPostcards = undefined;
    }
    let chosenHorizontalPostcards = [];
    if(props.horizontalData !== null){
        for(let i = 0; i < 7; i++){
            chosenHorizontalPostcards.push(props.horizontalData[i]);
            //If already in, then redo the number
        }
    }
    else{
        chosenHorizontalPostcards = undefined;
    }
    if(props.show) {
        return (
            <div className="home"> 
            {/* Read to make sure that Fragment documentation is understood before I actually use it (Lifecycle may be different) */}
                {/**************************** Banner **************************************/}
                {/* Make sure that you get them all to fit on one screen (including banner and carousel*/}
                <div className="bannerCrop">
                    {/* <img className="banner" src={banner} alt="Banner didn't load! Please try again"></img> */}
                    <h1 id="bannerText">Race, Gender, and the Visual Culture of Domestic Labor: <br/> Tradecards and Postcards, 1870s to 1940s </h1>
                </div> 
                {/**************************** Carousel **************************************/}
                <PopUp setShow={props.setShow} id="popupComponent"/>
            </div>
            
        );
    } else {
        return (
            <div className="home"> 
            {/* Read to make sure that Fragment documentation is understood before I actually use it (Lifecycle may be different) */}
                {/**************************** Banner **************************************/}
                {/* Make sure that you get them all to fit on one screen (including banner and carousel*/}
                <div className="bannerCrop">
                    {/* <img className="banner" src={banner} alt="Banner didn't load! Please try again"></img> */}
                    <h1 id="bannerText">Race, Gender, and the Visual Culture of Domestic Labor: <br/> Tradecards and Postcards, 1870s to 1940s </h1>
                </div> 
                {/**************************** Carousel **************************************/}
                <CustomPostcardCarousel imageList={chosenPostcards} horizontal={false}/>
                <CustomPostcardCarousel imageList={chosenHorizontalPostcards} horizontal={true}/>
                <p className="homeSummary">Our exhibition explores the proliferation of racism and sexism in the age of New Imperialism, Jim Crow segregation, and Asian Exclusion through a study of popular visual depictions 
                    of domestic workers in the medium of trade cards (late 1800s) and postcards (early 1900s). In investigating derogatory depictions of servants across global empires, our aim is to 
                    deconstruct through a critical lens how stereotypes and racialization of working-class/ colonized people constructed a dangerous narrative of hegemony that allowed certain—white, 
                    imperial, upper/middle class—populations to dominate social, cultural, economic, and political spaces across the world. The exhibition is organized thematically, following marginalized 
                    domestic workers across the globe, with an intent to uncover how the perpetuation of imperialist ideologies mimicked the transnational movement of postcards and trade cards themselves. 
                    By centering degrading historical objects, we hope to inspire critical conversations about anti-racism and social justice. As you explore this visual culture exhibit, we request that you 
                    keep the following question in mind: how can contextualizing racist and sexist historical images help us to identify and dismantle contemporary systemic biases?
                </p>
                <p className="classification">New Imperialism:</p>
                <p className="description">
                The period of New Imperialism (1875 to 1914) marked an era of unprecedented Euro-American colonial expansion into Asia, Africa, and Latin America. The modernization of technologies and weaponry largely enabled 
                this widespread imperial takeover, along with the need for captive colonial markets for Euro-American industrializing economies. This era encouraged fierce competition among the British, French, Dutch and other 
                “old” empires, while encouraging the entry of new global powers, such as the United States, Italy, Japan, Russia, and Germany. The era of New Imperialism coincided with the heyday of trade cards and postcards, 
                which brought the Empire to common people in Western countries, enabling the consumption of accessible ephemera that depicted colonized landscape and peoples. Trade cards and postcards claimed to present colonized 
                subjects with a realism undistorted by biases, especially using the new photographic and chromolithographic technologies. However, in reality, these objects enabled the “systemic distortion” of marginalized groups, 
                and perpetuated racist and sexist stereotypes. Although understudied by historians, trade cards and postcards were important tools of imperial propaganda, and provide us valuable glimpses of social attitudes in the 
                age of New Imperialism. 
                </p>
                <p className="classification">Jim Crow Laws:</p>
                <p className="description">
                After the American civil war and the abolition of slavery, a series of laws were passed enforcing and legitimizing racial segregation, discrimination, disenfranchisement, and anti-black racism in the United States. 
                The period of Jim Crow laws in the late 19th and early 20th C was also the period when trade cards and postcards mass-circulated racist caricatures of African American people, such as the Mammy and Uncle Tom which have 
                roots in American slavery and sustain the stereotypes of faithful servitude in post-emancipation America. They served as a sentimental souvenir of slavery and enabled white Americans to assuage their guilt and complicity 
                in the history of slavery and the culture of  racist discrimination. Trade cards and postcards enabled the mass distribution of themes, such as benevolent patriarchalism, white superiority, and scientific racism. 
                Trade cards and postcards also enabled white Americans to symbolically buy, gift, and own black bodies in the form of collectible ephemera in the decades after abolition, and in an age when inter-racial social interaction 
                was prohibited. 
                </p>
                <p className="classification">Yellow Peril and Asian Exclusion:</p>
                <p className="description">
                The late-nineteenth century witnessed tremendous anxiety about the supposed massive influx of East Asians (Yellow Peril) into Anglophone countries displacing white culture and stealing jobs. The Chinese Exclusion Act of 1882 
                suspended Chinese immigration to the United States for 10 years. This effort eventually expanded into the Asian Exclusion Act of 1924, which strictly limited Asian migration to the US. Asian menservants were still allowed entry 
                to fill the domestic service sector, which faced a labor shortage, yet they became targets of xenophobia. The racist humor depicted in many of the trade cards and postcards exhibited here indicates how American people viewed Chinese 
                men as perfect servants due to their perceived submissiveness and hard-working nature. Yet there was this paradoxical American eagerness to eradicate these “perpetual foreigners” from the country. 
                </p>
                <p className="classification">Women's Suffrage:</p>
                <p className="description">
                During the peak period of trade card and postcard circulation, white women in Britain and in North America were fighting for political rights. Their fight for the vote took them out of their households, leading to a perceived crisis 
                of domestic labor, seen as the domain of women. While middle and upper-class Western women fought for political equality with men, working-class women in domestic servitude were marginalized from both the women’s movements and the trade union movement. 
                In fact, domestic work was not even recognized as labor. Yet some maidservants were actively invested in both suffrage and labor rights activism in this period. 
                </p>
                <p className="classification">Servant Problem:</p>
                <p className="description">
                Due to the low-pay, long hours, and social stigma associated with domestic servitude, there was an acute shortage of working-class white women going into domestic service in the late 1800s and early 1900s. This led to a widespread perceived crisis 
                of domestic labor, labeled by employers as the “servant problem”. The few who were still working in this field were seen as less desirable candidates. African American domestic workers, Chinese menservants and the Irish immigrant maidservant - who predominantly 
                worked in the domestic service sector during the “Servant Problem” period - became the subject of sexist and racist humor in many of the trade cards and postcards. 
                </p>
            </div>
            
        );
    }
}