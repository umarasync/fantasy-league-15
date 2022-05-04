// Components
import Button from "components/html/Button";

// Constants
import colors from "constants/colors";
import { PLAYERS_POSITIONS } from "constants/data/filters";

// Utils
import { positionAbbr } from "utils/playersHelper";

export default function FilterButtons({ activePosition, onClick }) {
  const activePositionLabel = activePosition.label;
  return (
    <div>
      {PLAYERS_POSITIONS.map((position) => {
        return (
          <Button
            title={positionAbbr(position.label)}
            bg={
              activePositionLabel === position.label
                ? false
                : colors.lavender_grey
            }
            bs={activePositionLabel === position.label}
            fw={"600"}
            fst={"normal"}
            fs={16}
            mr={10}
            w={false}
            h={false}
            key={position.value}
            br={12}
            pl={12}
            pr={12}
            pt={8}
            pb={8}
            inline
            onClick={() => onClick({ ...position })}
          />
        );
      })}
    </div>
  );
}
