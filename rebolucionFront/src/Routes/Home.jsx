import CardHome from "../Components/HomeComponents/CardHome";
import HomeImageComponent from "../Components/HomeComponents/HomeImageComponent";
import ButtonSecttionHome from "../Components/HomeComponents/ButtonSectionHome";
import ResumenesHome from "../Components/HomeComponents/ResumenesHome";



export default function Home() {
  console.log("estamos aca");
  
  return (
    <>
       <HomeImageComponent/>
       <CardHome/>
       <ButtonSecttionHome/>
       <ResumenesHome/>
       </>
  );
}
