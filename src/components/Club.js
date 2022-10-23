import React, {useState} from "react";
import ClubData from "./ClubData";
import ClubCategory from "./ClubCategory";
import ClubCard from "./ClubCard";
import "../css/Club.css";

function Club() {

    const [clubItem, setClubItem] = useState(ClubData);
    const clubList = [...new Set(ClubData.map((Val) => Val.category))];

    const filterClubItem = (curVal) => {
        const newClubItem = ClubData.filter((newVal) => {
            return newVal.category === curVal;
        });
        setClubItem(newClubItem);
    }

    return (
        <div className="club">
            <div className="club-list">
                <ClubCategory
                    filterClubItem={filterClubItem}
                    setClubItem={setClubItem}
                    clubList={clubList}>
                </ClubCategory>
                <div className="club-card">
                    <ClubCard item={clubItem}></ClubCard>
                </div>
            </div>
        </div>
    )
}

export default Club;