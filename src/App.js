import { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as StrengthIcon } from "./assets/svg/strength.svg";
import { ReactComponent as AgilityIcon } from "./assets/svg/agility.svg";
import { ReactComponent as IntellegenceIcon } from "./assets/svg/intellegence.svg";
import { ReactComponent as MeleeIcon } from "./assets/svg/melee.svg";
import { ReactComponent as RangedIcon } from "./assets/svg/ranged.svg";



const HeroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 32px;
`;

const HeroCard = styled.div`
  width: 350px;
  height: 380px;
  margin: 5px;
  padding: 5px;
  max-width: 350px;
  border: 4px solid black;
  font-family: "Aladin";
  color: white;
  background-color: #374354;
  border-radius: 10%;
  border-color: white;
`;

const HeroName = styled.div`
  font-size: 36px;
  text-align: center;
  margin: 10px;
`
const HeroStats = styled.div`
  font-size: 24px;
  line-height: 140%;

`

const getAttackType = (type) => {
  switch (type) {
    case "Melee":
      return (
        <span>
          {type} <MeleeIcon width = "24px" height="24px"/>
        </span>
      );
    case "Ranged":
      return (
        <span>
          {type} <RangedIcon/>
        </span>
      );
  }
};

function App() {
  const [heroes, setHeroes] = useState();

  console.log(heroes)
  
  useEffect(() => {
    fetch("/heroes")
      .then((response) => response.json())
      .then((data) => {
        setHeroes(data);
      });
  }, []);

  return (
    <HeroContainer>
      {heroes &&
        heroes.map((hero) => {
          return (
            <HeroCard key={hero.id}>
              <HeroName > {hero.localized_name} </HeroName>
              <HeroStats> {"main attreute: " + hero.primary_attr} </HeroStats>
              <HeroStats> attack type: {getAttackType(hero.attack_type)} </HeroStats>
              <HeroStats>
                <HeroStats>ROLES:</HeroStats>
                <ul>
                {hero.roles.map((role, index) => (
                  <span key={index}>
                    <li>{role}</li>
                  </span>
                ))}
                </ul>
              </HeroStats>
            </HeroCard>
          );
        })}
    </HeroContainer>
  );
}

export default App;
