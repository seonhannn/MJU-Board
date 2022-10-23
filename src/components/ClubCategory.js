import React from "react";
import "../css/ClubCategory.css";

function ClubCategory({filterClubItem, setClubItem, clubList}) {
    return (
        <div className="club-category">
            {clubList.map((Val, id) => {
                return (
                    <button
                        className="club-category-btn"
                        onClick={() => filterClubItem(Val)}
                        key={id}>
                        {Val}
                    </button>
                );
            })}
        </div>
    )
}

export default ClubCategory;