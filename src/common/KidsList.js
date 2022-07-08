import MomApi from "../helpers/momApi";
import KidCard from "./KidCard";
import { useEffect, useState } from "react";

function KidsList() {
  const [kids, setKids] = useState([]);

  useEffect(function getKidsOnMount() {
    async function getKids() {

      const kidList = await MomApi.getMyKids();
      setKids(kidList);
    }
    getKids();
  }, []);


  return (<div>
    {kids.map(kid => <KidCard key={kid.id} kid={kid} />)}
  </div>);

}

export default KidsList;